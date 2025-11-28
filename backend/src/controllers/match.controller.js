import Job from "../models/Job.model.js";
import Match from '../models/Match.model.js' ; 
import User from "../models/User.model.js";
import natural from 'natural';


const tokenizer = new natural.WordTokenizer() ; 


function similarity(a , b) {
    const tokensA = tokenizer.tokenize(a.toLowerCase()) ; 
    const tokensB = tokenizer.tokenize(b.toLowerCase()) ;

    const intersection = tokensA.filter(t => tokensB.includes(t)) ; 

    return intersection.length = Math.max(tokensA.length , tokensB.length) ; 
}

export const getUserMatches = async (req , res) => {
    try {

        const user = await User.findById(req.user.id) ; 

        const jobs = await Job.find({}) ; 

        const resume = user.resumeText || "" ;

        const userSkills = user.skills.map(s => s.name.toLowerCase()) ; 

        let results = []  ;

        for (const job of jobs)
        {
            const titleScore = similarity(resume , job.title) ;
            const descScore = similarity(resume , job.description) ; 

            const skillsMatched = job.skills.filter( s => 
                userSkills.includes(s.toLowerCase())
            )  ; 

            const skillsMissing = job.skills.filter(
                s => !userSkills.includes(s.toLowerCase())
            ) ; 


            const skillScore = job.skills.length ? skillsMatched.length / job.skills.length : 0;


            const finalScore = ( titleScore * 0.3 + descScore * 0.4 + skillScore * 0.3 ) * 100 ; 

            results.push({
                jobId : job._id  , 
                score : Math.round(finalScore) , 
                skillsMatched , 
                skillsMissing 
            }) ; 


            await Match.create({
                userId : user._id  , 
                jobId : job._id ,
                score : Math.round(finalScore) , 
                skillsMatched , 
                skillsMissing
            })  ; 


        }

        results.sort((a , b ) => b.score - a.score) ; 

       return  res
                  .status(200)
                  .json(
                    results.slice(0  , 20)
                  ) ; 

        
    } 
    catch (error) {

        return res
                 .status(500)
                 .json({
                    message : "Server Error" ,
                    error : error.message 
                 })
        
    }
}


export const getMatchHistory = async (req , res) => {

    try {
        
        const matches = await Match.find({userId : req.user.id})
                                                    .populate("jobId") 
                                                    .sort({createdAt : -1}) ; 


       return res
                 .status(200)
                 .json(matches) ; 

    }
    
    catch (error) {

       return res
                 .status(500)
                 .json({
                    message : "Server Error" ,
                    error : error.message 
                 })
        
    }
}


export const reEmbedUserResume = async (req, res) => {
 return  res
           .json({ 
            message: "Resume Embedding API will be added later" 
              });
};

export const embedSingleJob = async (req, res) => {
  return res
          .json({ 
            message: "Job Embedding API will be added later" 
        });
};