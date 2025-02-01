import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// Import routes
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import barangayClearanceRoutes from "./routes/barangay.clearance.routes.js";
import barangayIndigencyRoutes from "./routes/barangay.indigency.routes.js";
import incidentReportRoutes from "./routes/incident.report.routes.js";
import cedulaRoutes from "./routes/cedula.routes.js";
import businessClearanceRoutes from "./routes/business.clearance.routes.js";
import blotterReportRoutes from "./routes/blotter.report.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
dotenv.config();

// Configure CORS before other middleware
app.use(cors());

// Increase payload limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Optimize MongoDB connection settings
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
            socketTimeoutMS: 45000, // Increase socket timeout
            maxPoolSize: 50, // Increase connection pool size
            wtimeoutMS: 30000, // Increase write timeout
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

// Handle MongoDB connection errors
mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Attempting to reconnect...");
    connectDB();
});

// Run server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
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
app.use("/api/blotter", blotterReportRoutes);
app.use("/api/users", userRoutes);

export default app;
