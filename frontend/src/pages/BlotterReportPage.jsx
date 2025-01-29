import { useState } from "react";
import BlotterReportForm from "@/components/forms/BlotterReportForm";
import axios from "axios";
import { toast } from "sonner";

const BlotterReportPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            // Append all form fields to FormData
            Object.keys(data).forEach((key) => {
                if (key === "evidence" && data[key]?.length) {
                    Array.from(data[key]).forEach((file) => {
                        formData.append("evidence", file);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            });

            const response = await axios.post(
                "http://localhost:5000/api/blotter/report",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Blotter report submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting blotter report:", error);
            const errorMessage =
                error.response?.data?.message || "Failed to submit report. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-8">File a Blotter Report</h1>
            <div className="max-w-4xl mx-auto">
                <BlotterReportForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default BlotterReportPage;
