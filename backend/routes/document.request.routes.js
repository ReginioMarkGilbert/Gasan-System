import express from "express";
import {
    getAllDocumentRequests,
    updateDocumentStatus,
} from "../controllers/document.request.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

// Get all document requests
router.get("/", verifyToken, getAllDocumentRequests);

// Update document status
router.patch("/:type/:id/status", verifyToken, updateDocumentStatus);

export default router;
