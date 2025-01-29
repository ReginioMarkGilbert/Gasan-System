import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    barangayClearanceSchema,
    barangayIndigencySchema,
    sedulaSchema,
} from "./validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getUserFromLocalStorage } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

const documentTypes = [
    "Barangay Clearance",
    "Barangay Indigency",
    "Sedula",
    "Barangay Official",
    "Incidents Report",
    "Barangay Business Clearance",
    "Requested Documents",
    "Blotter Reports",
];

const getSchemaForDocumentType = (documentType) => {
    switch (documentType) {
        case "Barangay Clearance":
            return barangayClearanceSchema;
        case "Barangay Indigency":
            return barangayIndigencySchema;
        case "Sedula":
            return sedulaSchema;
        // Add more cases for other document types
        default:
            return null;
    }
};

export default function DocumentRequestForm() {
    const [selectedDocument, setSelectedDocument] = useState(() => {
        return localStorage.getItem("selectedDocument") || "";
    });

    const [user, setUser] = useState(() => getUserFromLocalStorage());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update user when component mounts and when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setUser(getUserFromLocalStorage());
        };

        // Listen for storage changes
        window.addEventListener("storage", handleStorageChange);

        // Initial user fetch
        setUser(getUserFromLocalStorage());

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Get initial form values from localStorage
    const getInitialFormValues = () => {
        const savedFormData = localStorage.getItem("documentFormData");

        const defaultValues = {
            name: user?.name || "",
            email: user?.email || "",
            barangay: user?.barangay || "",
            dateOfBirth: "",
            purpose: "",
            contactNumber: "",
        };

        return savedFormData ? JSON.parse(savedFormData) : defaultValues;
    };

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
        watch,
    } = useForm({
        resolver: zodResolver(getSchemaForDocumentType(selectedDocument)),
        defaultValues: getInitialFormValues(),
    });

    // Update form when user changes
    useEffect(() => {
        if (user) {
            reset({
                ...watch(),
                name: user.name || watch("name"),
                email: user.email || watch("email"),
                barangay: user.barangay || watch("barangay"),
            });
        }
    }, [user, reset, watch]);

    // Watch form values changes
    const formValues = watch();

    // Save form data whenever it changes
    useEffect(() => {
        const subscription = watch((value) => {
            if (Object.keys(value).length > 0) {
                localStorage.setItem("documentFormData", JSON.stringify(value));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // Save selected document type to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("selectedDocument", selectedDocument);
    }, [selectedDocument]);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const schema = getSchemaForDocumentType(selectedDocument);
            if (schema) {
                await schema.parseAsync(data);

                const requestBody = {
                    name: data.name,
                    email: data.email,
                    barangay: data.barangay,
                    purpose: data.purpose,
                    contactNumber: data.contactNumber,
                    dateOfBirth: data.dateOfBirth,
                };

                const response = await axios.post(
                    "http://localhost:5000/api/barangay-clearance/request",
                    requestBody,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.status === 201) {
                    // Clear form-related data from localStorage but preserve user data
                    localStorage.removeItem("documentFormData");
                    localStorage.removeItem("selectedDocument");
                    setSelectedDocument("");

                    // Reset form but keep user's basic information
                    reset({
                        name: user?.name || "",
                        email: user?.email || "",
                        barangay: user?.barangay || "",
                        dateOfBirth: "",
                        purpose: "",
                        contactNumber: "",
                    });

                    // Show success notification
                    toast.success("Document request submitted successfully!");
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            // Show error notification
            const errorMessage =
                error.response?.data?.message ||
                "Failed to submit document request. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Modified reset function to clear localStorage
    const handleReset = () => {
        localStorage.removeItem("documentFormData");
        localStorage.removeItem("selectedDocument");
        setSelectedDocument("");
        reset({
            name: "",
            email: "",
            barangay: "",
            dateOfBirth: "",
            purpose: "",
            contactNumber: "",
        });
    };

    const renderFormFields = () => {
        switch (selectedDocument) {
            case "Barangay Clearance":
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                onChange={(e) => {
                                    register("name").onChange(e);
                                    const formData = { ...formValues, name: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.name && (
                                <p className="text-red-500 text-sm">{formErrors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                onChange={(e) => {
                                    register("email").onChange(e);
                                    const formData = { ...formValues, email: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-sm">{formErrors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="barangay">Barangay</Label>
                            <Input
                                id="barangay"
                                {...register("barangay")}
                                onChange={(e) => {
                                    register("barangay").onChange(e);
                                    const formData = { ...formValues, barangay: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.barangay && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.barangay.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                {...register("dateOfBirth")}
                                onChange={(e) => {
                                    register("dateOfBirth").onChange(e);
                                    const formData = { ...formValues, dateOfBirth: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose of Request</Label>
                            <Input
                                id="purpose"
                                {...register("purpose")}
                                onChange={(e) => {
                                    register("purpose").onChange(e);
                                    const formData = { ...formValues, purpose: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.purpose && (
                                <p className="text-red-500 text-sm">{formErrors.purpose.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input
                                id="contactNumber"
                                {...register("contactNumber")}
                                onChange={(e) => {
                                    register("contactNumber").onChange(e);
                                    const formData = {
                                        ...formValues,
                                        contactNumber: e.target.value,
                                    };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.contactNumber && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.contactNumber.message}
                                </p>
                            )}
                        </div>
                    </div>
                );
            case "Barangay Indigency":
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                {...register("fullName")}
                                onChange={(e) => {
                                    register("fullName").onChange(e);
                                    const formData = { ...formValues, fullName: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.fullName && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                {...register("dateOfBirth")}
                                onChange={(e) => {
                                    register("dateOfBirth").onChange(e);
                                    const formData = { ...formValues, dateOfBirth: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                {...register("address")}
                                onChange={(e) => {
                                    register("address").onChange(e);
                                    const formData = { ...formValues, address: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.address && (
                                <p className="text-red-500 text-sm">{formErrors.address.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input
                                id="contactNumber"
                                {...register("contactNumber")}
                                onChange={(e) => {
                                    register("contactNumber").onChange(e);
                                    const formData = {
                                        ...formValues,
                                        contactNumber: e.target.value,
                                    };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.contactNumber && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.contactNumber.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="income">Monthly/Annual Income</Label>
                            <Input
                                id="income"
                                {...register("income")}
                                onChange={(e) => {
                                    register("income").onChange(e);
                                    const formData = { ...formValues, income: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.income && (
                                <p className="text-red-500 text-sm">{formErrors.income.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="householdMembers">Number of Household Members</Label>
                            <Input
                                id="householdMembers"
                                type="number"
                                min="1"
                                {...register("householdMembers")}
                                onChange={(e) => {
                                    register("householdMembers").onChange(e);
                                    const formData = {
                                        ...formValues,
                                        householdMembers: e.target.value,
                                    };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.householdMembers && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.householdMembers.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose of Request</Label>
                            <Input
                                id="purpose"
                                {...register("purpose")}
                                onChange={(e) => {
                                    register("purpose").onChange(e);
                                    const formData = { ...formValues, purpose: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.purpose && (
                                <p className="text-red-500 text-sm">{formErrors.purpose.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="supportingDocs">Supporting Documents (Upload)</Label>
                            <Input
                                id="supportingDocs"
                                type="file"
                                multiple
                                accept="image/*,application/pdf"
                                {...register("supportingDocs")}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                onChange={(e) => {
                                    register("supportingDocs").onChange(e);
                                    const formData = {
                                        ...formValues,
                                        supportingDocs: e.target.files,
                                    };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.supportingDocs && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.supportingDocs.message}
                                </p>
                            )}
                        </div>
                    </div>
                );
            case "Sedula":
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                {...register("fullName")}
                                onChange={(e) => {
                                    register("fullName").onChange(e);
                                    const formData = { ...formValues, fullName: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.fullName && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                {...register("dateOfBirth")}
                                onChange={(e) => {
                                    register("dateOfBirth").onChange(e);
                                    const formData = { ...formValues, dateOfBirth: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                {...register("address")}
                                onChange={(e) => {
                                    register("address").onChange(e);
                                    const formData = { ...formValues, address: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.address && (
                                <p className="text-red-500 text-sm">{formErrors.address.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Input
                                id="occupation"
                                {...register("occupation")}
                                onChange={(e) => {
                                    register("occupation").onChange(e);
                                    const formData = { ...formValues, occupation: e.target.value };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.occupation && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.occupation.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="civilStatus">Civil Status</Label>
                            <Select
                                onValueChange={(value) =>
                                    register("civilStatus").onChange({ target: { value } })
                                }
                            >
                                <SelectTrigger id="civilStatus">
                                    <SelectValue placeholder="Select civil status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="divorced">Divorced</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                </SelectContent>
                            </Select>
                            {formErrors.civilStatus && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.civilStatus.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="grossAnnualIncome">
                                Gross Annual Income (if applicable)
                            </Label>
                            <Input
                                id="grossAnnualIncome"
                                type="number"
                                min="0"
                                step="1000"
                                {...register("grossAnnualIncome")}
                                onChange={(e) => {
                                    register("grossAnnualIncome").onChange(e);
                                    const formData = {
                                        ...formValues,
                                        grossAnnualIncome: e.target.value,
                                    };
                                    localStorage.setItem(
                                        "documentFormData",
                                        JSON.stringify(formData)
                                    );
                                }}
                            />
                            {formErrors.grossAnnualIncome && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.grossAnnualIncome.message}
                                </p>
                            )}
                        </div>
                    </div>
                );
            // Add more cases for other document types here
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="documentType">Document Type</Label>
                        <Select
                            value={selectedDocument}
                            onValueChange={(value) => {
                                setSelectedDocument(value);
                                // Don't reset form data when changing document type
                                const savedFormData = JSON.parse(
                                    localStorage.getItem("documentFormData") || "{}"
                                );
                                reset(savedFormData);
                            }}
                        >
                            <SelectTrigger id="documentType">
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {documentTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {renderFormFields()}
                    <div className="flex justify-end space-x-4 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
