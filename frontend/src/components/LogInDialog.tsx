"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"; // Make sure lucide-react is installed: npm install lucide-react

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: {
    email: string;
    password: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>; // 🔥 fix here
  isLoading: boolean;
  onForgotPasswordClick?: () => void;
}



 export function LoginDialog({
  open,
  onOpenChange,
  form,
  onFormChange,
  onSubmit,
  isLoading,
  onForgotPasswordClick,
}: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full p-6 space-y-6 rounded-lg shadow-xl"> {/* Added shadow-xl and rounded-lg */}
        <DialogHeader className="text-center"> {/* Centered header text */}
          <DialogTitle className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome Back!
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 dark:text-gray-400 mt-2">
            Log in to your account to continue shopping.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              aria-label="Your email address"
              value={form.email}
              onChange={onFormChange}
              required
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              aria-label="Your password"
              value={form.password}
              onChange={onFormChange}
              required
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-50"
            />
            {onForgotPasswordClick && (
              <Button
                variant="link"
                type="button"
                onClick={onForgotPasswordClick}
                className="text-sm text-blue-600 hover:underline p-0 h-auto justify-end mt-1 dark:text-blue-400"
              >
                Forgot password?
              </Button>
            )}
          </div>
          <DialogFooter className="pt-4 sm:pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg py-2 h-auto rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
