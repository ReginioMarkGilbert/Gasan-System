import express from "express";
import {
    createIncidentReport,
    updateIncidentStatus,
    getEvidence,
} from "../controllers/incident.report.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

// Create an incident report
// POST /api/incident-report/submit
router.post("/submit", verifyToken, createIncidentReport);

// Update incident status
// PATCH /api/incident-report/status/:id
router.patch("/status/:id", verifyToken, updateIncidentStatus);

// Get evidence file
// GET /api/incident-report/:id/evidence/:fileIndex
router.get("/:id/evidence/:fileIndex", verifyToken, getEvidence);

export default router;
