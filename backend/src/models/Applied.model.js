import mongoose from "mongoose";

const appliedSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId  , 
        ref : "User" ,
        required : true 
    } , 

    jobId : {
        type : mongoose.Schema.Types.ObjectId  , 

        ref : "Job" , 
        requried : true ,
    } , 

    status : {
        type : String , 
        enum : ["saved" , "applied" , "ignored"] , 
        default : "saved"
    }
} ,
{timestamps:true}
)


const Applied = mongoose.model("Applied" , appliedSchema) ; 

export default Applied ; 