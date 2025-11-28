import { Queue , Worker } from "bullmq";
import { cleanJob } from '../cleaners/cleanJob.js'; 
const connection = { connection: { url: process.env.REDIS_URL } };

const embedQueue = new Queue("jobs_to_embed"  , connection)  ; 

new Worker("jobs_raw" , async job => {
    const raw = job.data ;
    const cleaned = cleanJob(raw) ;  
    await embedQueue.add("embed_job" , cleaned) ; 
} , connection) ; 



