import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blotterReportSchema } from "./validationSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropTypes from "prop-types";

export default function BlotterReportForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(blotterReportSchema),
    });

    const handleGenderChange = useCallback(
        (value) => setValue("complainantGender", value),
        [setValue]
    );

    const handleCivilStatusChange = useCallback(
        (value) => setValue("complainantCivilStatus", value),
        [setValue]
    );

    const handleActionChange = useCallback(
        (value) => setValue("actionRequested", value),
        [setValue]
    );

    const handleFormSubmit = (data) => {
        console.log("BlotterReportForm - Submitting data:", data);
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Complainant Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Complainant Information</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="complainantName">Full Name</Label>
                        <Input
                            id="complainantName"
                            {...register("complainantName")}
                            placeholder="Enter your full name"
                        />
                        {errors.complainantName && (
                            <p className="text-red-500 text-sm">{errors.complainantName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="complainantAge">Age</Label>
                        <Input
                            id="complainantAge"
                            type="number"
                            {...register("complainantAge")}
                            placeholder="Enter your age"
                        />
                        {errors.complainantAge && (
                            <p className="text-red-500 text-sm">{errors.complainantAge.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="complainantGender">Gender</Label>
                        <Select onValueChange={handleGenderChange}>
                            <SelectTrigger id="complainantGender">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.complainantGender && (
                            <p className="text-red-500 text-sm">
                                {errors.complainantGender.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="complainantCivilStatus">Civil Status</Label>
                        <Select onValueChange={handleCivilStatusChange}>
                            <SelectTrigger id="complainantCivilStatus">
                                <SelectValue placeholder="Select civil status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                                <SelectItem value="Separated">Separated</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.complainantCivilStatus && (
                            <p className="text-red-500 text-sm">
                                {errors.complainantCivilStatus.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="complainantAddress">Address</Label>
                        <Input
                            id="complainantAddress"
                            {...register("complainantAddress")}
                            placeholder="Enter your address"
                        />
                        {errors.complainantAddress && (
                            <p className="text-red-500 text-sm">
                                {errors.complainantAddress.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="complainantContact">Contact Number</Label>
                        <Input
                            id="complainantContact"
                            {...register("complainantContact")}
                            placeholder="Enter your contact number"
                        />
                        {errors.complainantContact && (
                            <p className="text-red-500 text-sm">
                                {errors.complainantContact.message}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Respondent Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Respondent Information</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="respondentName">Full Name</Label>
                        <Input
                            id="respondentName"
                            {...register("respondentName")}
                            placeholder="Enter respondent's name"
                        />
                        {errors.respondentName && (
                            <p className="text-red-500 text-sm">{errors.respondentName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="respondentAddress">Address (if known)</Label>
                        <Input
                            id="respondentAddress"
                            {...register("respondentAddress")}
                            placeholder="Enter respondent's address"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="respondentContact">Contact Number (if known)</Label>
                        <Input
                            id="respondentContact"
                            {...register("respondentContact")}
                            placeholder="Enter respondent's contact"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Incident Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Incident Details</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="incidentDate">Date of Incident</Label>
                        <Input id="incidentDate" type="date" {...register("incidentDate")} />
                        {errors.incidentDate && (
                            <p className="text-red-500 text-sm">{errors.incidentDate.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="incidentTime">Time of Incident</Label>
                        <Input id="incidentTime" type="time" {...register("incidentTime")} />
                        {errors.incidentTime && (
                            <p className="text-red-500 text-sm">{errors.incidentTime.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="incidentLocation">Location</Label>
                        <Input
                            id="incidentLocation"
                            {...register("incidentLocation")}
                            placeholder="Enter incident location"
                        />
                        {errors.incidentLocation && (
                            <p className="text-red-500 text-sm">
                                {errors.incidentLocation.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="incidentType">Type of Incident</Label>
                        <Input
                            id="incidentType"
                            {...register("incidentType")}
                            placeholder="e.g., theft, assault, dispute"
                        />
                        {errors.incidentType && (
                            <p className="text-red-500 text-sm">{errors.incidentType.message}</p>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="narrative">Detailed Narrative</Label>
                        <Textarea
                            id="narrative"
                            {...register("narrative")}
                            placeholder="Describe what happened in detail..."
                            className="min-h-[100px]"
                        />
                        {errors.narrative && (
                            <p className="text-red-500 text-sm">{errors.narrative.message}</p>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="motive">Possible Motive (Optional)</Label>
                        <Input
                            id="motive"
                            {...register("motive")}
                            placeholder="Enter possible motive"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Witnesses and Evidence */}
            <Card>
                <CardHeader>
                    <CardTitle>Witnesses and Evidence</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="witnessName">Witness Name (if any)</Label>
                        <Input
                            id="witnessName"
                            {...register("witnessName")}
                            placeholder="Enter witness name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="witnessContact">Witness Contact (if any)</Label>
                        <Input
                            id="witnessContact"
                            {...register("witnessContact")}
                            placeholder="Enter witness contact"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="evidence">Evidence (Optional)</Label>
                        <Input id="evidence" type="file" {...register("evidence")} multiple />
                    </div>
                </CardContent>
            </Card>

            {/* Action Requested */}
            <Card>
                <CardHeader>
                    <CardTitle>Action Requested</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="actionRequested">Desired Action</Label>
                        <Select onValueChange={handleActionChange}>
                            <SelectTrigger id="actionRequested">
                                <SelectValue placeholder="Select desired action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Mediation">Mediation</SelectItem>
                                <SelectItem value="Barangay Intervention">
                                    Barangay Intervention
                                </SelectItem>
                                <SelectItem value="Police/Court Action">
                                    Police/Court Action
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.actionRequested && (
                            <p className="text-red-500 text-sm">{errors.actionRequested.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                    Submit Report
                </button>
            </div>
        </form>
    );
}

BlotterReportForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
