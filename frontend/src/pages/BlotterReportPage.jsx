import BlotterReportForm from "@/components/forms/BlotterReportForm";
import axios from "axios";
import { useState } from "react";
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
        <div className="flex flex-col h-screen">
            {/* Fixed header */}
            <div className="bg-gray-100 p-8 flex-shrink-0">
                <h1 className="text-2xl font-bold">File a Blotter Report</h1>
            </div>
            {/* Scrollable form container with custom scrollbar and bottom padding */}
            <div className="flex-1 overflow-hidden px-8">
                <div
                    className="max-w-4xl mx-auto h-full pr-4 overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:border-2
                    [&::-webkit-scrollbar-thumb]:border-transparent
                    hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                    dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
                    dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500"
                >
                    {/* increase this to make it scroll all the way  to the button  */}
                    <div className="pb-24">
                        {" "}
                        {/* Added padding wrapper */}
                        <BlotterReportForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlotterReportPage;
