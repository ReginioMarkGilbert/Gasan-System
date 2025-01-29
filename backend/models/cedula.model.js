import mongoose from "mongoose";

const cedulaSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        placeOfBirth: {
            type: String,
            required: true,
        },
        barangay: {
            type: String,
            required: true,
        },
        civilStatus: {
            type: String,
            enum: ["Single", "Married", "Widowed", "Separated"],
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        employerName: String,
        employerAddress: String,
        incomeSource: {
            type: String,
            required: true,
        },
        grossAnnualIncome: {
            type: String,
            required: true,
        },
        businessGrossSales: String,
        realEstateIncome: String,
        validId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Cedula = mongoose.model("Cedula", cedulaSchema);
export default Cedula;
