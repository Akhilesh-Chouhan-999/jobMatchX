import jwt from 'jsonwebtoken' ; 
import User from '../models/User.model.js';


export const protect = async (req , res , next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1]   ; 

        if(!token)
        return res.status(401).json({
        message : "Not authorized" , 
        success : false}) ;

    const decode = jwt.verify(token , process.env.JWT_SECRTET) ; 

    req.user = await User.findById(decode.id).select("-password")  ; 

    next() ;



    } catch (error) {
        
        res.status(401).json({
            message : "Invalid Token" 
        })
    }
}
