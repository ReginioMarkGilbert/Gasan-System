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
    fullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(1, "Address is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    income: z.string().min(1, "Income is required"),
    householdMembers: z.string().min(1, "Number of household members is required"),
    purpose: z.string().min(1, "Purpose is required"),
    supportingDocs: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Supporting documents are required"),
});

export const sedulaSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(1, "Address is required"),
    occupation: z.string().min(1, "Occupation is required"),
    civilStatus: z.string().min(1, "Civil status is required"),
    grossAnnualIncome: z.string().min(1, "Gross annual income is required"),
});

// Add more schemas for other document types as needed
