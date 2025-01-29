import { z } from "zod";

export const barangayClearanceSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email format"),
    barangay: z.string().min(1, "Barangay is required"),
    purpose: z.string().min(1, "Purpose is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export const barangayIndigencySchema = z.object({
    name: z.string().min(1, "Full name is required"),
    barangay: z.string().min(1, "Barangay is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    monthlyIncome: z.string().min(1, "Monthly income is required"),
    purpose: z.string().min(1, "Purpose is required"),
});

export const sedulaSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(1, "Address is required"),
    occupation: z.string().min(1, "Occupation is required"),
    civilStatus: z.string().min(1, "Civil status is required"),
    grossAnnualIncome: z.string().min(1, "Gross annual income is required"),
});

export const incidentReportSchema = z.object({
    category: z.string().min(1, "Category is required"),
    subCategory: z.string().min(1, "Sub-category is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    reporterName: z.string().min(1, "Your name is required"),
    reporterContact: z.string().min(1, "Contact information is required"),
    evidence: z.instanceof(FileList).optional(),
});

export const cedulaSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    placeOfBirth: z.string().min(1, "Place of birth is required"),
    barangay: z.string().min(1, "Barangay is required"),
    municipality: z.string().min(1, "Municipality is required"),
    province: z.string().min(1, "Province is required"),
    civilStatus: z.enum(["Single", "Married", "Widowed", "Separated"], {
        required_error: "Civil status is required",
    }),
    citizenship: z.string().min(1, "Citizenship is required"),
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
    occupation: z.string().min(1, "Occupation is required"),
    employerName: z.string().optional(),
    employerAddress: z.string().optional(),
    incomeSource: z.string().min(1, "Source of income is required"),
    grossAnnualIncome: z.string().min(1, "Gross annual income is required"),
    businessGrossSales: z.string().optional(),
    realEstateIncome: z.string().optional(),
    validId: z.string().min(1, "Valid ID information is required"),
});

// Add more schemas for other document types as needed
