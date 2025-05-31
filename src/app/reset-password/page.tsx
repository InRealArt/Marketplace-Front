'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button/Button';
import { toast } from 'sonner';
import { resetPassword } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';

// Password validation regex
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

// Form schema for reset password
const resetPasswordSchema = z.object({
  password: z.string().min(10, {
    message: "Password must be at least 10 characters.",
  }).regex(passwordValidation, {
    message: 'Your password is not valid (Min 8 characters, at least, 1 uppercase, one lowercase, 1 number and 1 special character)',
  }),
  confirmPassword: z.string().min(10, {
    message: "Password must be at least 10 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Styling constants
const FormLabelStyle = "absolute font-montserrat text-[14px] tracking-[0px] z-10 top-[5px] left-[35px] bg-[#313130] px-[10px]";
const InputStyle = "text-white rounded-[10px] border-2 border-[#b39e73] bg-transparent w-full h-[64px] py-[10px] px-[15px] font-poppins text-[18px] tracking-[-0.25px] mt-[15px] focus:bg-transparent focus:outline-none";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [resetComplete, setResetComplete] = useState(false);

  useEffect(() => {
    // Get token from URL
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      toast.error('Invalid or missing reset token');
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!token) {
      toast.error('Missing reset token');
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        token,
        newPassword: values.password,
      }, {
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Failed to reset password');
          setLoading(false);
        },
        onSuccess: () => {
          toast.success('Your password has been reset successfully');
          setResetComplete(true);
          setLoading(false);
        },
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('An error occurred while resetting your password');
      setLoading(false);
    }
  };

  if (resetComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#313130] p-4">
        <div className="bg-[#313130] p-8 rounded-[20px] border-2 border-[#b39e73] w-full max-w-md">
          <div className="flex flex-col items-center">
            <Image
              src="/images/LoginHeader.png"
              width={400}
              height={100}
              alt="HeaderImage"
              className="w-full h-auto rounded-t-[20px] mb-6"
            />
            <h1 className="font-montserrat text-[28px] tracking-[0px] font-bold text-white text-center mb-4">
              Password Reset Complete
            </h1>
            <p className="font-poppins text-[16px] text-white text-center mb-6">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <Link href="/">
              <Button
                text="Go to Sign In"
                additionalClassName="login"
                className="w-full mt-5"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#313130] p-4">
      <div className="bg-[#313130] p-8 rounded-[20px] border-2 border-[#b39e73] w-full max-w-md">
        <div className="flex flex-col items-center">
          <Image
            src="/images/LoginHeader.png"
            width={400}
            height={100}
            alt="HeaderImage"
            className="w-full h-auto rounded-t-[20px] mb-6"
          />
          <h1 className="font-montserrat text-[28px] tracking-[0px] font-bold text-white text-center mb-4">
            Reset Your Password
          </h1>
          <p className="font-poppins text-[16px] text-white text-center mb-6">
            Please enter your new password below
          </p>
        </div>

        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative w-full mb-4">
                  <FormLabel className={FormLabelStyle}>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className={InputStyle}
                      placeholder="***********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className={FormLabelStyle}>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className={InputStyle}
                      placeholder="***********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              text={loading ? 'Resetting...' : 'Reset Password'}
              additionalClassName="login"
              className="w-full mt-6"
              disabled={loading}
            />
          </form>
        </Form>
      </div>
    </div>
  );
} 