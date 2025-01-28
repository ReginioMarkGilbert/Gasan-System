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
        return localStorage.getItem('selectedDocument') || '';
    });

    // Get initial form values from localStorage
    const getInitialFormValues = () => {
        const savedFormData = localStorage.getItem('documentFormData');
        return savedFormData ? JSON.parse(savedFormData) : {
            fullName: '',
            dateOfBirth: '',
            address: '',
            purpose: '',
            contactNumber: '',
            validId: '',
            // Add other default field values as needed
        };
    };

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(getSchemaForDocumentType(selectedDocument)),
        defaultValues: getInitialFormValues(), // Pass the values directly instead of a function
    });

    // Watch form values changes
    const formValues = watch();

    // Save form data whenever it changes
    useEffect(() => {
        const subscription = watch((value) => {
            if (Object.keys(value).length > 0) {
                localStorage.setItem('documentFormData', JSON.stringify(value));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // Save selected document type to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('selectedDocument', selectedDocument);
    }, [selectedDocument]);

    const onSubmit = async (data) => {
        try {
            const schema = getSchemaForDocumentType(selectedDocument);
            if (schema) {
                await schema.parseAsync(data);
                console.log("Form data is valid:", data);
                // Clear saved data after successful submission
                localStorage.removeItem('documentFormData');
                localStorage.removeItem('selectedDocument');
                setSelectedDocument('');
                reset();
                // Here you would typically send the data to your server
            }
        } catch (error) {
            if (error.errors) {
                // Handle validation errors
            }
        }
    };

    // Modified reset function to clear localStorage
    const handleReset = () => {
        localStorage.removeItem('documentFormData');
        localStorage.removeItem('selectedDocument');
        setSelectedDocument('');
        reset({
            fullName: '',
            dateOfBirth: '',
            address: '',
            purpose: '',
            contactNumber: '',
            validId: '',
            // Reset other fields as needed
        });
    };

    const renderFormFields = () => {
        switch (selectedDocument) {
            case "Barangay Clearance":
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
                                }}
                            />
                            {formErrors.address && (
                                <p className="text-red-500 text-sm">{formErrors.address.message}</p>
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    const formData = { ...formValues, contactNumber: e.target.value };
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
                                }}
                            />
                            {formErrors.contactNumber && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.contactNumber.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="validId">Valid ID (Upload)</Label>
                            <Input
                                id="validId"
                                type="file"
                                accept="image/*,application/pdf"
                                {...register("validId")}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                onChange={(e) => {
                                    register("validId").onChange(e);
                                    const formData = { ...formValues, validId: e.target.files[0]?.name || '' };
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
                                }}
                            />
                            {formErrors.validId && (
                                <p className="text-red-500 text-sm">{formErrors.validId.message}</p>
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    const formData = { ...formValues, contactNumber: e.target.value };
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    const formData = { ...formValues, householdMembers: e.target.value };
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    const formData = { ...formValues, supportingDocs: e.target.files };
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                    const formData = { ...formValues, grossAnnualIncome: e.target.value };
                                    localStorage.setItem('documentFormData', JSON.stringify(formData));
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
                                const savedFormData = JSON.parse(localStorage.getItem('documentFormData') || '{}');
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
                        <Button type="button" variant="outline" onClick={handleReset}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit Request</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
