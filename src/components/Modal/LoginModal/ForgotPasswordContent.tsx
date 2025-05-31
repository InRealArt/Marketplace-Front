'use client'

import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from '@/components/ui/form';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'sonner';
import { FormHeader, EmailField, SubmitButton } from './FormComponents';
import { forgotPasswordSchema } from './ValidationSchemas';

interface ForgotPasswordContentProps {
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordContent = ({ setIsSignin, setShowForgotPassword }: ForgotPasswordContentProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setLoading(true);
    try {
      // Directly call our custom password reset API
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          redirectUrl: `${window.location.origin}/reset-password`,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Error in forgot password:", data.error);
        // Show the same success message regardless of the outcome
        // to prevent email enumeration attacks
        toast.success("If this email is registered, a password reset link has been sent");
      } else {
        toast.success("Password reset link has been sent to your email");
      }
      
      setShowForgotPassword(false);
      setLoading(false);
    } catch (error) {
      console.error("Error resetting password:", error);
      // Show the same success message to prevent email enumeration attacks
      toast.success("If this email is registered, a password reset link has been sent");
      setShowForgotPassword(false);
      setLoading(false);
    }
  };

  return (
    <>
      <FormHeader
        title="Forgot Password"
        subtitle="We'll send you a link to reset your password"
        linkText="Back to sign in"
        onLinkClick={() => setShowForgotPassword(false)}
      />
      <Form {...form}>
        <form className="w-full max-w-[300px] mx-auto mt-[15px]" onSubmit={form.handleSubmit(onSubmit)}>
          <EmailField form={form} />
          <SubmitButton
            loading={loading}
            text="Send reset link"
            loadingText="Sending..."
          />
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordContent; 