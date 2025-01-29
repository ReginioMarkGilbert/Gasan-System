import IncidentReport from "../models/incident.report.model.js";

export const createIncidentReport = async (req, res, next) => {
    try {
        const {
            category,
            subCategory,
            date,
            time,
            location,
            description,
            reporterName,
            reporterContact,
            evidence,
        } = req.body;

        // Create new incident report with evidence files
        const incidentReport = new IncidentReport({
            category,
            subCategory,
            date,
            time,
            location,
            description,
            reporterName,
            reporterContact,
            evidence: evidence || [],
        });

        await incidentReport.save();

        // Remove the binary data from the response
        const responseData = incidentReport.toObject();
        if (responseData.evidence) {
            responseData.evidence = responseData.evidence.map((file) => ({
                filename: file.filename,
                contentType: file.contentType,
            }));
        }

        res.status(201).json({
            success: true,
            message: "Incident report submitted successfully",
            data: responseData,
        });
    } catch (error) {
        next(error);
    }
};

export const updateIncidentStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const incidentReport = await IncidentReport.findById(id);

        if (!incidentReport) {
            return res.status(404).json({
                success: false,
                message: "Incident report not found",
            });
        }

        incidentReport.status = status;
        await incidentReport.save();

        res.status(200).json({
            success: true,
            message: "Incident status updated successfully",
            data: incidentReport,
        });
    } catch (error) {
        next(error);
    }
};

// Add a function to get evidence file by ID
export const getEvidence = async (req, res, next) => {
    try {
        const { id, fileIndex } = req.params;

        const report = await IncidentReport.findById(id);
        if (!report || !report.evidence[fileIndex]) {
            return res.status(404).json({
                success: false,
                message: "File not found",
            });
        }

        const file = report.evidence[fileIndex];
        res.set("Content-Type", file.contentType);
        res.send(file.data);
    } catch (error) {
        next(error);
    }
};
