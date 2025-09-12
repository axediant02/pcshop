"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login } from "@/services/authService"; // Import the login service

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // Call the login service with the form data
      const response = await login(form);

      // Assuming the login service returns a token upon success
      if (response.token) {
        localStorage.setItem("token", response.token); // Store the token
        alert("Login successful!"); // Provide user feedback
        onClose(); // Close the modal on success
      } else {
        setError("Login failed: No token received."); // Handle unexpected response
      }
    } catch (err: unknown) {
      // Type guard for Axios error structure
      if (err && typeof err === 'object' && 'response' in err) {
        const errorResponse = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
        // Check for validation errors from Laravel backend (e.g., 'email' for incorrect credentials)
        if (errorResponse.response?.data?.errors) {
          const errors = errorResponse.response.data.errors;
          if (errors.email) {
            setError(errors.email[0]); // Display the first email-related error
          } else {
            // Fallback to general message if specific error not found
            setError(errorResponse.response?.data?.message || 'An unexpected error occurred during login.');
          }
        } else {
          // If no 'errors' object, use the general message from the response
          setError(errorResponse.response?.data?.message || 'An unexpected error occurred during login.');
        }
      } else {
        // Handle non-Axios or unknown errors
        setError('An unexpected error occurred.');
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
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
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
