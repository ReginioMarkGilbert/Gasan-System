import User from "../models/user.model.js";
import { sendVerificationConfirmationEmail } from "../utils/emails.js";

export const getUsersByBarangay = async (req, res, next) => {
    try {
        const { role, barangay } = req.user;

        // Check if user has permission to access this data
        if (role !== "secretary" && role !== "chairman") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Not authorized.",
            });
        }

        // Find users from the same barangay
        const users = await User.find({
            barangay,
            // Exclude admin users from results
            role: { $nin: ["admin"] },
        })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
export const getUserById = async (req, res, next) => {
    try {
        const { role, barangay } = req.user;
        const { userId } = req.params;

        // Check if user has permission
        if (role !== "secretary" && role !== "chairman") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Not authorized.",
            });
        }

        const user = await User.findOne({
            _id: userId,
            barangay, // Ensure user belongs to same barangay
        }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// Add this method to the existing user.controller.js
export const verifyUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role, barangay } = req.user;

        // Check if user has permission
        if (role !== "secretary" && role !== "chairman") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Not authorized.",
            });
        }

        const user = await User.findOne({
            _id: userId,
            barangay,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Always send verification email when requested
        try {
            const emailSent = await sendVerificationConfirmationEmail(user);

            if (!emailSent) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to send verification email",
                });
            }
        } catch (emailError) {
            return res.status(500).json({
                success: false,
                message: "Error sending verification email",
            });
        }

        // Update verification status
        user.isVerified = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User verified successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const rejectUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role, barangay } = req.user;

        // Check if user has permission
        if (role !== "secretary" && role !== "chairman") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Not authorized.",
            });
        }

        const user = await User.findOne({
            _id: userId,
            barangay,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Set user as rejected
        user.isVerified = false;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User rejected successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
