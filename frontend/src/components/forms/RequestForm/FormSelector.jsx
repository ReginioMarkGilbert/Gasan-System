import { useState } from "react";
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
import BarangayClearanceForm from "./BarangayClearanceForm";
import IncidentReportForm from "./IncidentReportForm";
import BarangayIndigencyForm from "./BarangayIndigencyForm";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "sonner";

const documentTypes = [
    "Barangay Clearance",
    "Barangay Indigency",
    "Sedula",
    "Barangay Business Clearance",
    "Requested Documents",
];

export default function FormSelector({ user }) {
    const [selectedDocument, setSelectedDocument] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data, formType) => {
        try {
            setIsSubmitting(true);
            const endpoint = getEndpointForFormType(formType);

            const response = await axios.post(
                `http://localhost:5000/api/${endpoint}/request`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            case "incident-report":
                return "incident-report";
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
            case "Incidents Report":
                return <IncidentReportForm user={user} onSubmit={handleSubmit} />;
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
                                onClick={() => setSelectedDocument("")}
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

FormSelector.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        barangay: PropTypes.string,
    }),
};
