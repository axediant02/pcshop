"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login } from "@/services/authService"; // Import the login service
import { toast } from 'react-toastify'; // Import toast for notifications

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // State for loading indicator
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

    try {
      // Call the login service with the form data
      const response = await login(form);

      // Assuming the login service returns a token upon success
      if (response.token) {
        localStorage.setItem("token", response.token); // Store the token
        toast.success("Login successful!"); // Provide user feedback with toast
        onClose(); // Close the modal on success
      } else {
        toast.error("Login failed: No token received."); // Handle unexpected response with toast
      }
    } catch (err: unknown) {
      // Type guard for Axios error structure
      if (err && typeof err === 'object' && 'response' in err) {
        const errorResponse = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
        // Check for validation errors from Laravel backend (e.g., 'email' for incorrect credentials)
        if (errorResponse.response?.data?.errors) {
          const errors = errorResponse.response.data.errors;
          if (errors.email) {
            toast.error(errors.email[0]); // Display the first email-related error with toast
          } else {
            // Fallback to general message if specific error not found
            toast.error(errorResponse.response?.data?.message || 'An unexpected error occurred during login.');
          }
        } else {
          // If no 'errors' object, use the general message from the response
          toast.error(errorResponse.response?.data?.message || 'An unexpected error occurred during login.');
        }
      } else {
        // Handle non-Axios or unknown errors
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          {/* Removed local error display as toast will handle error messages */}
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"} {/* Show loading state */}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
