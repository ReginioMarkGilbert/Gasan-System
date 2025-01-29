import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getUserFromLocalStorage } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import BarangayClearanceForm from "./RequestForm/BarangayClearanceForm";
import BarangayIndigencyForm from "./RequestForm/BarangayIndigencyForm";
import CedulaForm from "./RequestForm/CedulaForm";
import BusinessClearanceForm from "./RequestForm/BusinessClearanceForm";

const documentTypes = [
    "Barangay Clearance",
    "Barangay Indigency",
    "Cedula",
    "Barangay Business Clearance",
    "Requested Documents",
];

export default function DocumentRequestForm() {
    const [selectedDocument, setSelectedDocument] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState(() => getUserFromLocalStorage());

    // Update user when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setUser(getUserFromLocalStorage());
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleSubmit = async (data, formType) => {
        try {
            setIsSubmitting(true);
            const endpoint = getEndpointForFormType(formType);

            console.log(`Submitting to: /api/${endpoint}/request`, data);

            const response = await axios.post(
                `http://localhost:5000/api/${endpoint}/request`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Document request submitted successfully!");
                setSelectedDocument("");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            const errorMessage =
                error.response?.data?.message || "Failed to submit request. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getEndpointForFormType = (formType) => {
        switch (formType) {
            case "barangay-clearance":
                return "barangay-clearance";
            case "barangay-indigency":
                return "barangay-indigency";
            case "cedula":
                return "cedula";
            case "business-clearance":
                return "business-clearance";
            default:
                return "";
        }
    };

    const renderForm = () => {
        switch (selectedDocument) {
            case "Barangay Clearance":
                return <BarangayClearanceForm user={user} onSubmit={handleSubmit} />;
            case "Barangay Indigency":
                return <BarangayIndigencyForm user={user} onSubmit={handleSubmit} />;
            case "Cedula":
                return <CedulaForm user={user} onSubmit={handleSubmit} />;
            case "Barangay Business Clearance":
                return <BusinessClearanceForm user={user} onSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Document Request Form
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="documentType">Document Type</Label>
                        <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                            <SelectTrigger id="documentType">
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                                {documentTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {renderForm()}
                    {selectedDocument && (
                        <div className="flex justify-end space-x-4 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setSelectedDocument("");
                                }}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" form="document-form" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
