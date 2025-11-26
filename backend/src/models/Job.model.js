import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

    title : {
        type : String , 
        required : true 
    } , 

    company : {
        type : String , 
        required : true 
    } ,

    location : {
        type : String ,
    } , 

    remote : {
        type : Boolean , 
        default : false 
    } , 

    stipend : {
        type : Number 
    } , 

    postedDate : {
        type : Date
    }  ,

    deadline : {
        type : Date 
    } ,

    skills : [ String] , 

    description : { 
        type : String , 
    } , 

    source : { 
        type : String , 
        required : true 
    } , 

    url : {
        type : String , 
        required : true 
    } , 

    embeddingId : {
        type : String , 
    } 
} , 
{timestamps : true}
) ; 


const Job = mongoose.model('Job' , jobSchema) ;

export default Job ; 