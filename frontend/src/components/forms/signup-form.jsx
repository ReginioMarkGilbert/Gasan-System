// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Components and UI elements
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

// Utilities
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const schema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    barangay: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
});

export function SignupForm({ className }) {
    const [loading, setLoading] = useState(false);
    const [barangays, setBarangays] = useState([]);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            barangay: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleRegister = async (values) => {
        try {
            const { name, barangay, email, password, confirmPassword } = values;

            if (password !== confirmPassword) {
                toast.error("Passwords do not match.");
                return;
            }

            if (!name || !email || !barangay || !password || !confirmPassword) {
                toast.error("All fields are required.");
                return;
            }

            setLoading(true);

            const res = await axios.post(`http://localhost:5000/api/auth/signup`, {
                name,
                barangay,
                email,
                password,
            });

            if (res.status === 201) {
                setLoading(false);
                navigate("/sign-in");
                toast.success("Account created successfully.", {
                    description: "Please verify your email to login.",
                });
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                setLoading(false);
                toast.error("Email is already taken", {
                    description: "Please try another email.",
                });
            } else if (error.response && error.response.status === 401) {
                setLoading(false);
                toast.error("Name is already taken", {
                    description: "Please try another name.",
                });
            }
            setLoading(false);
        }
    };

    const fetchBarangays = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_GASAN_BARANGAYS_API_URL);
            setBarangays(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBarangays();
    }, []);

    return (
        <Form {...form}>
            <form
                className={cn("flex flex-col gap-6", className)}
                onSubmit={form.handleSubmit(handleRegister)}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create an account with Company Name</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your details below to create an account
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="John Doe" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="barangay"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Barangay</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value} // Bind the value
                                            onValueChange={(value) => {
                                                field.onChange(value); // Update the field value in react-hook-form
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Barangay" />
                                            </SelectTrigger>
                                            <SelectContent className="w-full">
                                                {barangays && barangays.length > 0 ? (
                                                    barangays.map((barangay) => (
                                                        <SelectItem
                                                            key={barangay.code}
                                                            value={barangay.name}
                                                        >
                                                            {barangay.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <p>No barangays available</p>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="m@example.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>
                </div>

                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <p
                        className="underline underline-offset-4 cursor-pointer"
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign in
                    </p>
                </div>
            </form>
        </Form>
    );
}

SignupForm.propTypes = {
    className: PropTypes.string,
};
