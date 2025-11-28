import { Queue } from 'bullmq';

const connection = {
    connection: { url: process.env.REDIS_URL }
};

export const jobQueue = new Queue("jobs_raw", connection);

export const enqueueJob = async (jobpayload) => {
    await jobQueue.add("new_job", jobpayload,
        { removeOnComplete: true, removeOnFail: true }
    )
}