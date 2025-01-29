import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Import routes
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import barangayClearanceRoutes from "./routes/barangay.clearance.routes.js";
import barangayIndigencyRoutes from "./routes/barangay.indigency.routes.js";
import incidentReportRoutes from "./routes/incident.report.routes.js";
import cedulaRoutes from "./routes/cedula.routes.js";
import businessClearanceRoutes from "./routes/business.clearance.routes.js";

const app = express();
dotenv.config();

// Configure CORS before other middleware
app.use(cors());

app.use(express.json({ limit: "50mb" })); // Increase payload limit for base64 images
app.use(cookieParser());

// Run server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(error);
    });

// Create error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error!";
    res.status(
        statusCode.json({
            success: false,
            message,
            statusCode,
        })
    );
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/barangay-clearance", barangayClearanceRoutes);
app.use("/api/barangay-indigency", barangayIndigencyRoutes);
app.use("/api/incident-report", incidentReportRoutes);
app.use("/api/cedula", cedulaRoutes);
app.use("/api/business-clearance", businessClearanceRoutes);

export default app;
