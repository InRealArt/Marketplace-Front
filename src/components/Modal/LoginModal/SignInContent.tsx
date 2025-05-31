'use client'

import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from '@/components/ui/form';
import { useAppDispatch } from '@/redux/hooks';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { FormHeader, EmailField, PasswordField, SubmitButton } from './FormComponents';
import { formSignInSchema } from './ValidationSchemas';

interface SignInContentProps {
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInContent = ({ setIsSignin, setShowForgotPassword }: SignInContentProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSignInSchema>) => {
    const { email, password } = values;
    setLoading(true);

    // Use signIn.email from auth-client directly
    await signIn.email({
      email,
      password,
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
        onSuccess: () => {
          dispatch(setLoginModalDisplay(false));
          toast.success("You are connected!");
          setLoading(false);
        },
      },
    });
  };

  return (
    <>
      <FormHeader
        title="Welcome to In Real Art"
        subtitle="Don't have an account?"
        linkText="Create one"
        onLinkClick={() => setIsSignin(false)}
      />
      <Form {...form}>
        <form className="w-full max-w-[300px] mx-auto mt-[15px]" onSubmit={form.handleSubmit(onSubmit)}>
          <EmailField form={form} />
          <PasswordField 
            form={form} 
            showForgotPassword={true} 
            onForgotPasswordClick={() => setShowForgotPassword(true)} 
          />
          <SubmitButton
            loading={loading}
            text="Sign in"
            loadingText="Loading..."
          />
        </form>
      </Form>
    </>
  );
};

export default SignInContent; 