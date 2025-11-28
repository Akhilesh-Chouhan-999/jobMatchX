import express from 'express' ; 
import { protect } from '../middlewares/auth.middleware';
const router = express.Router() ; 

router.get("/recommend" , protect , getUserMatches) ; 

router.post("/embed" , protect , reEmbedUserResume) ; 

router.post("/job-embed/:jobId", protect, embedSingleJob);

router.get("/history", protect, getMatchHistory);

export default router;