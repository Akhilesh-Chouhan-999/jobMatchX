import Job from '../models/Job.model.js' ; 

export const createJob = async (req , res) => {

    try {
       
      const job = await Job.create(req.body) ;

        return res
                 .status(201)
                 .json({
                  message : "Job Created Successfully" , 
                  job , 
        }) ; 
    } 
    
    catch (error) 
    {
    
        return res
                 .status(500)
                 .json({
                  message: "Error creating job",
                  error: error.message,
                      });

    }
}
export const getJobs = async(req , res ) => {
    try {
        
        const {remote , stipendMin  , domain , search , location } = req.query ; 

        const filters = {} ; 

        if(remote === "true") 
          filters.remote = true ; 

        if(stipendMin)
           filters.stipend = { $gte : Number(stipendMin)}

        if(domain) 
          filters.skills = { $in : [domain] }  ; 

        if(location) 
          filters.location = new RegExp(location , i) ;

       
    if (search)
    {
      filters.$or = [
        { title: new RegExp(search, i) },
        { company: new RegExp(search, i) },
      ];
    }

    const jobs = await Job.find(filters).sort({createdAt : -1})

    res.status(200).json(jobs) ;

    } 
    catch (error) 
    {

      res
        .status(500)
        .json({
        message: "Error fetching job",
        error: error.message,
             });

    }
}


export const getJobById = async (req, res) => {
 
  try {
    const job = await Job.findById(req.params.id);

     if (!job)
      return res      
                .status(404)
                .json({
                   message: "Job not found" 
                  });

    res
      .status(200)
      .json(job);

  } 
  catch (error) 
  {
    res
      .status(500)
      .json({
      message: "Error fetching job",
      error: error.message,
      });
  }
};