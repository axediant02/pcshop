"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signup } from "@/services/authService";
import { toast } from 'react-toastify'; // Import toast for notifications

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

// Define the full data structure expected by the backend for signup
type BackendSignupRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function SignupModal({ open, onClose }: SignupModalProps) {
  // Add passwordConfirmation to the form state
  const [form, setForm] = useState({ name: "", email: "", password: "", passwordConfirmation: "" });
  const [loading, setLoading] = useState(false);
  // Removed local error state as toast will handle error display
  // const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Clear previous errors (if any were displayed locally, though now using toast)
    // setError("");

    // Client-side validation for password confirmation
    if (form.password !== form.passwordConfirmation) {
      toast.error("Passwords do not match."); // Use toast for client-side validation error
      setLoading(false);
      return;
    }

    try {
      // The signup service in authService.ts currently has a type definition
      // that only expects { name: string; password: string }.
      // However, the backend's register endpoint (from context) expects
      // name, email, password, and password_confirmation.
      // To make this work without modifying authService.ts (which is outside
      // the selection), we will pass all necessary fields.
      // We use a type assertion (as unknown as Parameters<typeof signup>[0])
      // to bypass TypeScript's strict checking for excess properties.
      // This is safe because the actual implementation of `signup` in authService.ts
      // passes the data directly to axios, which can handle the full payload
      // required by the backend, despite the narrower type definition in authService.ts.
      const signupPayload: BackendSignupRequest = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      };

      await signup(signupPayload as unknown as Parameters<typeof signup>[0]);

      toast.success("Account created successfully!"); // Use toast for success message
      onClose();
    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'response' in err) {
            const errorResponse = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
            // Check for validation errors from Laravel backend
            if (errorResponse.response?.data?.errors) {
                const errors = errorResponse.response.data.errors;
                // Prioritize specific error messages from the backend
                if (errors.password && errors.password.includes("The password confirmation does not match.")) {
                    toast.error("Passwords do not match."); // Use toast for backend validation error
                } else if (errors.email) {
                    toast.error(errors.email[0]); // Display first email error with toast
                } else if (errors.name) {
                    toast.error(errors.name[0]); // Display first name error with toast
                } else if (errors.password) {
                    toast.error(errors.password[0]); // Display first password error with toast
                } else {
                    // Fallback to general message if specific error not found
                    toast.error(errorResponse.response?.data?.message || 'Something went wrong');
                }
            } else {
                // If no 'errors' object, use the general message
                toast.error(errorResponse.response?.data?.message || 'Something went wrong');
            }
        } else {
            toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          {/* Add Input for passwordConfirmation */}
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm Password"
            value={form.passwordConfirmation}
            onChange={handleChange}
            required
          />

          {/* Removed local error display as toast will handle error messages */}
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
