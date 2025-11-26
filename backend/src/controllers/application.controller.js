import Applied from "../models/Applied.model.js";

export const saveJob = async (req, res) => {
    try {

        const { jobId } = req.body;
        const userId = req.user.id;

        const exists = await Applied.findOne({ userId, jobId });

        if (exists) {
            return res
                .status(400)
                .json({
                    message: "Job Already Saved"
                })
        }

        const entry = await Applied.create({
            userId,
            jobId,
            status: "saved"
        })

        return res
            .status(201)
            .json({
                message: "Job saved successfully",
                entry
            })


    }
    catch (error) {
        return res
            .status(500)
            .json({
                message: "Server Error",
                error: error.message
            });
    }
}


export const applyJob = async (req, res) => {


    try {

        const { jobId } = req.body;
        const userId = req.user.id;

        const entry = await Applied.findOneAndUpdate({ userId, jobId },
            { status: "applied" },
            { new: true, upsert: true }
        )


        return res
            .status(200)
            .json({
                message: "Job marked as applied",
                entry,
            });

    }
    catch (error) {
        return res
            .status(500)
            .json({
                message: "Server Error",
                error: error.message
            });
    }
}

export const ignoreJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.user.id;

        const entry = await Applied.findOneAndUpdate(
            { userId, jobId },
            { status: "ignored" },
            { new: true, upsert: true }
        )

        res.status(200).json({
            message: "Job ignored",
            entry,
        });


    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const saved = await Applied.find({
            userId,
            status: "saved"
        }).populate("jobId");

        return res
            .status(200)
            .json(saved)
    }
    catch (error) {

        res.status(500).json(
            { message: "Server Error", error: error.message }
        )

    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const applied = await Applied.find({ userId, status: "applied" }).populate("jobId");

      return  res.status(200).json(applied);

    } catch (error) {
       return  res.status(500).json({ message: "Server Error", error: error.message });
    }
};