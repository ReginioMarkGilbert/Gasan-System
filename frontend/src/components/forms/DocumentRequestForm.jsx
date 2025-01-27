import { useState } from "react";
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
    const [selectedDocument, setSelectedDocument] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
    } = useForm({
        resolver: zodResolver(getSchemaForDocumentType(selectedDocument)),
    });

    const onSubmit = async (data) => {
        try {
            const schema = getSchemaForDocumentType(selectedDocument);
            if (schema) {
                await schema.parseAsync(data);
                console.log("Form data is valid:", data);
                // Here you would typically send the data to your server
            }
        } catch (error) {
            if (error.errors) {
                // setErrors(
                //     error.errors.reduce((acc, curr) => {
                //         acc[curr.path[0]] = curr.message;
                //         return acc;
                //     }, {})
                // );
            }
        }
    };

    const renderFormFields = () => {
        switch (selectedDocument) {
            case "Barangay Clearance":
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" {...register("fullName")} />
                            {formErrors.fullName && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                            {formErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" {...register("address")} />
                            {formErrors.address && (
                                <p className="text-red-500 text-sm">{formErrors.address.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose of Request</Label>
                            <Input id="purpose" {...register("purpose")} />
                            {formErrors.purpose && (
                                <p className="text-red-500 text-sm">{formErrors.purpose.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input id="contactNumber" {...register("contactNumber")} />
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
                            <Input id="fullName" {...register("fullName")} />
                            {formErrors.fullName && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                            {formErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" {...register("address")} />
                            {formErrors.address && (
                                <p className="text-red-500 text-sm">{formErrors.address.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input id="contactNumber" {...register("contactNumber")} />
                            {formErrors.contactNumber && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.contactNumber.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="income">Monthly/Annual Income</Label>
                            <Input id="income" {...register("income")} />
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
                            />
                            {formErrors.householdMembers && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.householdMembers.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose of Request</Label>
                            <Input id="purpose" {...register("purpose")} />
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
                            <Input id="fullName" {...register("fullName")} />
                            {formErrors.fullName && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                            {formErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" {...register("address")} />
                            {formErrors.address && (
                                <p className="text-red-500 text-sm">{formErrors.address.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Input id="occupation" {...register("occupation")} />
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
                            onValueChange={(value) => {
                                setSelectedDocument(value);
                                reset(); // Reset form when document type changes
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
                        <Button type="button" variant="outline" onClick={() => reset()}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit Request</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
