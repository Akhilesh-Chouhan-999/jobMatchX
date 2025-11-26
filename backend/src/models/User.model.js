import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String , 
            requred : true 
        } , 

        email : {
            type : String , 
            required : true , 
            unique : true 
        } , 

        password : {
            type : String , 
            required : true , 
        } ,
        
        resumeText : {
            type : String 
        } , 

        skills : [
            {
                name : String , 
                level : {
                    type : String , 
                  enum : ["beginner", "intermediate" ,"expert"], 
                   default: "beginner"
                }
            }
        ] ,

        preferences : {
            remote : {
                type : Boolean , 
                default : false
            } ,

            StipendMin : {
                type : Number , 
                default : 0 
            } ,

            domain : { 
                type : String 
            }
        }
    } ,
    { timestamps : true}
) ;

const User = mongoose.model("User" , userSchema) ; 

export default User ;

