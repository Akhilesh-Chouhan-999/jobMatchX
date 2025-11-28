import express from 'express' ; 
import dotenv from 'dotenv' ; 
import connectDB from'./config/db.config.js'
import authRoutes from "./routes/auth.routes.js"
import jobRoutes from './routes/job.routes.js'
import matchRoutes from './routes/match.route.js'
import applicationRoutes from "./routes/application.routes.js"; 


dotenv.config() ; 
const app = express() ; 
app.use(express.json()) ; 

const PORT = process.env.PORT || 1000  ;

// Authentication Routest : Login and Register . 
app.use("/api/auth"  , authRoutes )

// Job finding routes . 
app.use("/api/jobs", jobRoutes);

// Application Routes . 
app.use("/api/applications" , applicationRoutes) ;


app.use("/api/match" , matchRoutes) ; 

app.listen( PORT , async () => {
    console.log( ` Server is listening at the port : ${PORT} `) ;
    connectDB() ; 

})

