import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { barangayIndigencySchema } from "../validationSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function BarangayIndigencyForm({ onSubmit, initialData, onDataChange }) {
    const { currentUser } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(barangayIndigencySchema),
        defaultValues: {
            name: currentUser?.name || "",
            barangay: currentUser?.barangay || "",
            contactNumber: initialData?.contactNumber || "",
            purpose: initialData?.purpose || "",
        },
    });

    // Watch form values and notify parent component of changes
    const formValues = watch();
    useEffect(() => {
        onDataChange?.(formValues);
    }, [formValues, onDataChange]);

    // Update form when user changes
    useEffect(() => {
        if (currentUser) {
            setValue("name", currentUser.name || "");
            setValue("barangay", currentUser.barangay || "");
        }
    }, [currentUser, setValue]);

    const handleFormSubmit = (data) => {
        console.log("Submitting indigency form with data:", data);
        onSubmit(data, "barangay-indigency");
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
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                        id="purpose"
                        {...register("purpose")}
                        placeholder="Enter purpose for indigency"
                    />
                    {errors.purpose && (
                        <p className="text-red-500 text-sm">{errors.purpose.message}</p>
                    )}
                </div>
            </div>
        </form>
    );
}

BarangayIndigencyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    onDataChange: PropTypes.func,
};
