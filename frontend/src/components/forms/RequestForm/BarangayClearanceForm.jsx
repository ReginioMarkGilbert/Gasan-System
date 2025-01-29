import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { barangayClearanceSchema } from "../validationSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { getUserFromLocalStorage } from "@/lib/utils";

export default function BarangayClearanceForm({ onSubmit }) {
    // Get user data directly from localStorage
    const [currentUser, setCurrentUser] = useState(() => getUserFromLocalStorage());

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(barangayClearanceSchema),
        defaultValues: {
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            barangay: currentUser?.barangay || "",
            purpose: "",
            contactNumber: "",
            dateOfBirth: "",
        },
    });

    // Update form when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const userData = getUserFromLocalStorage();
            setCurrentUser(userData);
            if (userData) {
                setValue("name", userData.name || "");
                setValue("email", userData.email || "");
                setValue("barangay", userData.barangay || "");
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [setValue]);

    const handleFormSubmit = (data) => {
        console.log("Submitting clearance form with data:", data);
        onSubmit(data, "barangay-clearance");
    };

    return (
        <form id="document-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        defaultValue={currentUser?.email || ""}
                        readOnly
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
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
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                        id="purpose"
                        {...register("purpose")}
                        placeholder="Enter purpose for clearance"
                    />
                    {errors.purpose && (
                        <p className="text-red-500 text-sm">{errors.purpose.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                        id="contactNumber"
                        type="tel"
                        {...register("contactNumber")}
                        placeholder="Enter your contact number"
                    />
                    {errors.contactNumber && (
                        <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
                    )}
                </div>
            </div>
        </form>
    );
}

BarangayClearanceForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
