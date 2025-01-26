// Third-party libraries
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";

// Components and UI elements
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

// Utilities
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";

const schema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address."),
  role: z.enum(["chairman", "secretary"], {
    message: "Role is required.",
  }),
  barangayName: z.string().min(2, {
    message: "Barangay Name must be at least 2 characters.",
  }),
});

export function BarangayUserRegistration({ className }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      barangayName: "",
    },
  });

  const handleRegister = async (values) => {
    console.log(values);
    try {
      const { name, email, role, barangayName } = values;

      if (!firstName || !lastName || !email || !role || !barangayName) {
        toast.error("All fields are required.");
        return;
      }

      setLoading(true);

      const res = await axios.post(`http://localhost:5000/api/auth/register`, {
        firstName,
        lastName,
        email,
        role,
        barangayName,
      });

      if (res.status === 201) {
        setLoading(false);
        navigate("/sign-in");
        toast.success("User registered successfully.", {
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
      }
      setLoading(false);
    }
  };

  return (
      <Card className="w-full max-w-md mx-auto">
          <CardHeader>
              <CardTitle>Register Barangay User</CardTitle>
              <CardDescription>Add a new chairman or secretary to the barangay system.</CardDescription>
          </CardHeader>
          <CardContent>
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(handleRegister)}
      >
        <div className="grid gap-2">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John" />
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="chairman">Chairman</SelectItem>
                        <SelectItem value="secretary">Secretary</SelectItem>
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
              name="barangayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barangay Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Barangay Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register User"}
          </Button>
        </div>
      </form>
    </Form>
            </CardContent>
        </Card>
  );
}

BarangayUserRegistration.propTypes = {
  className: PropTypes.string,
};