import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cedulaSchema } from "../validationSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";
import { getUserFromLocalStorage } from "@/lib/utils";

export default function CedulaForm({ onSubmit }) {
    const [currentUser, setCurrentUser] = useState(() => getUserFromLocalStorage());

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(cedulaSchema),
        defaultValues: {
            name: currentUser?.name || "",
            barangay: currentUser?.barangay || "",
        },
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const userData = getUserFromLocalStorage();
            setCurrentUser(userData);
            if (userData) {
                setValue("name", userData.name || "");
                setValue("barangay", userData.barangay || "");
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [setValue]);

    const handleFormSubmit = (data) => {
        console.log("Submitting cedula form with data:", data);
        onSubmit(data, "cedula");
    };

    return (
        <form id="document-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        {...register("name")}
                        defaultValue={currentUser?.name || ""}
                        readOnly
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="placeOfBirth">Place of Birth</Label>
                    <Input
                        id="placeOfBirth"
                        {...register("placeOfBirth")}
                        placeholder="Enter place of birth"
                    />
                    {errors.placeOfBirth && (
                        <p className="text-red-500 text-sm">{errors.placeOfBirth.message}</p>
                    )}
                </div>

                {/* Address Information */}
                <div className="space-y-2">
                    <Label htmlFor="barangay">Barangay</Label>
                    <Input
                        id="barangay"
                        {...register("barangay")}
                        defaultValue={currentUser?.barangay || ""}
                        readOnly
                    />
                    {errors.barangay && (
                        <p className="text-red-500 text-sm">{errors.barangay.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="municipality">Municipality</Label>
                    <Input
                        id="municipality"
                        {...register("municipality")}
                        placeholder="Enter municipality"
                    />
                    {errors.municipality && (
                        <p className="text-red-500 text-sm">{errors.municipality.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Input id="province" {...register("province")} placeholder="Enter province" />
                    {errors.province && (
                        <p className="text-red-500 text-sm">{errors.province.message}</p>
                    )}
                </div>

                {/* Personal Details */}
                <div className="space-y-2">
                    <Label htmlFor="civilStatus">Civil Status</Label>
                    <Select onValueChange={(value) => setValue("civilStatus", value)}>
                        <SelectTrigger id="civilStatus">
                            <SelectValue placeholder="Select civil status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                            <SelectItem value="Separated">Separated</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.civilStatus && (
                        <p className="text-red-500 text-sm">{errors.civilStatus.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="citizenship">Citizenship</Label>
                    <Input
                        id="citizenship"
                        {...register("citizenship")}
                        placeholder="Enter citizenship"
                    />
                    {errors.citizenship && (
                        <p className="text-red-500 text-sm">{errors.citizenship.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                        id="height"
                        type="number"
                        {...register("height")}
                        placeholder="Enter height"
                    />
                    {errors.height && (
                        <p className="text-red-500 text-sm">{errors.height.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                        id="weight"
                        type="number"
                        {...register("weight")}
                        placeholder="Enter weight"
                    />
                    {errors.weight && (
                        <p className="text-red-500 text-sm">{errors.weight.message}</p>
                    )}
                </div>

                {/* Employment Information */}
                <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                        id="occupation"
                        {...register("occupation")}
                        placeholder="Enter occupation"
                    />
                    {errors.occupation && (
                        <p className="text-red-500 text-sm">{errors.occupation.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="employerName">Employer Name (if employed)</Label>
                    <Input
                        id="employerName"
                        {...register("employerName")}
                        placeholder="Enter employer name"
                    />
                    {errors.employerName && (
                        <p className="text-red-500 text-sm">{errors.employerName.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="employerAddress">Employer Address</Label>
                    <Input
                        id="employerAddress"
                        {...register("employerAddress")}
                        placeholder="Enter employer address"
                    />
                    {errors.employerAddress && (
                        <p className="text-red-500 text-sm">{errors.employerAddress.message}</p>
                    )}
                </div>

                {/* Income Information */}
                <div className="space-y-2">
                    <Label htmlFor="incomeSource">Source of Income</Label>
                    <Input
                        id="incomeSource"
                        {...register("incomeSource")}
                        placeholder="Enter source of income"
                    />
                    {errors.incomeSource && (
                        <p className="text-red-500 text-sm">{errors.incomeSource.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="grossAnnualIncome">Gross Annual Income</Label>
                    <Input
                        id="grossAnnualIncome"
                        type="number"
                        step="0.01"
                        {...register("grossAnnualIncome")}
                        placeholder="Enter gross annual income"
                    />
                    {errors.grossAnnualIncome && (
                        <p className="text-red-500 text-sm">{errors.grossAnnualIncome.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="businessGrossSales">Business Gross Sales (if applicable)</Label>
                    <Input
                        id="businessGrossSales"
                        type="number"
                        step="0.01"
                        {...register("businessGrossSales")}
                        placeholder="Enter business gross sales"
                    />
                    {errors.businessGrossSales && (
                        <p className="text-red-500 text-sm">{errors.businessGrossSales.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="realEstateIncome">Real Estate Income (if applicable)</Label>
                    <Input
                        id="realEstateIncome"
                        type="number"
                        step="0.01"
                        {...register("realEstateIncome")}
                        placeholder="Enter real estate income"
                    />
                    {errors.realEstateIncome && (
                        <p className="text-red-500 text-sm">{errors.realEstateIncome.message}</p>
                    )}
                </div>

                {/* ID Information */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="validId">Valid ID Information</Label>
                    <Input
                        id="validId"
                        {...register("validId")}
                        placeholder="Enter valid ID information"
                    />
                    {errors.validId && (
                        <p className="text-red-500 text-sm">{errors.validId.message}</p>
                    )}
                </div>
            </div>
        </form>
    );
}

CedulaForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
