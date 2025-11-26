import express from 'express'
import { createJob, getJobs, getJobById } from "../controllers/job.controller.js";
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router() ; 

router.post("/" , protect , createJob ) ;

router.get("/" , getJobs) ;

router.get("/:id" , protect ,  getJobById) ; 

export default router  ; 

