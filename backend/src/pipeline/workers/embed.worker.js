import { Worker } from "bullmq";
import axios from 'axios'  ; 

const ML_URL = process.env.ML_URL ||  "http://localhost:8000/embed";

new Worker("jobs_to_embed", async job => {
    
  const jobData = job.data;
  // call ML service to get embedding vector
  const resp = await axios.post(ML_URL, { id: jobData._id, text: jobData.title + " " + jobData.description });
  const embedding = resp.data.embedding;
  // store embedding ID or vector in your Job doc or vector DB
  // e.g., await Job.findByIdAndUpdate(jobData._id, { embedding, embeddingId: someId });
});