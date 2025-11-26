import mongoose from 'mongoose' ;

const matchSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId , ref : "User" , 
        required : true 
    } , 

    jobId : {

        type : mongoose.Schema.Types.ObjectId , 
        ref : "Job" ,
        required : true 
    } , 

    score : {
        type : Number , 
        required : true 
    } , 

    skillsMatched : [String ] , 

    skillsMissing : 
    [String] 
} , {
    timestamps : true 
}) ; 

const Match = mongoose.Model("Match" , matchSchema) ; 

export default Match ; 
