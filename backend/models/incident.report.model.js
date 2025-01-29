import mongoose from "mongoose";

const incidentReportSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        reporterName: {
            type: String,
            required: true,
        },
        reporterContact: {
            type: String,
            required: true,
        },
        evidence: [
            {
                filename: String,
                contentType: String,
                data: Buffer,
            },
        ],
        status: {
            type: String,
            enum: ["pending", "investigating", "resolved"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const IncidentReport = mongoose.model("IncidentReport", incidentReportSchema);

export default IncidentReport;
