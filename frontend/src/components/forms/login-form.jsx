// filepath: /c:/Users/chest/OneDrive/Documents/Projects/Gasan System/frontend/src/components/forms/login-form.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { loginFailure, loginStart, loginSuccess } from "@/redux/user/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export function LoginForm({ className }) {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard?tab=home");
        } else {
            navigate("/sign-in");
        }
    }, [currentUser, navigate]);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (values) => {
        try {
            setLoading(true);
            dispatch(loginStart());
            const { email, password } = values;

            if (!email || !password) {
                toast.error("All fields are required.");
                return;
            }

            const response = await axios.post("http://localhost:5000/api/auth/login", values, {
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                },
            });

            const data = response.data;

            if (response.status === 200) {
                const user = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    barangay: data.barangay,
                    isVerified: data.isVerified,
                    role: data.role,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                };

                localStorage.setItem("user", JSON.stringify(user));
                dispatch(loginSuccess(user));
                localStorage.setItem("token", data.token);
                toast.success("Logged in successfully.");
                setLoading(false);
                navigate("/dashboard?tab=home");
            }
        } catch (error) {
            setLoading(false);
            dispatch(loginFailure(error.response?.data?.message || "Login failed"));
            console.error(error);
            toast.error("Invalid email or password.");
        }
    };

    return (
        <Form {...form}>
            <form
                className={cn("flex flex-col gap-6", className)}
                onSubmit={form.handleSubmit(handleLogin)}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div className="grid gap-6">
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
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <p
                                            onClick={() => navigate("/forgot-password")}
                                            className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer"
                                        >
                                            Forgot your password?
                                        </p>
                                    </div>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <p
                        className="underline underline-offset-4 cursor-pointer"
                        onClick={() => navigate("/sign-up")}
                    >
                        Sign up
                    </p>
                </div>
            </form>
        </Form>
    );
}

LoginForm.propTypes = {
    className: PropTypes.string,
};
