'use client'

import React, { useRef, useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/redux/hooks';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { toast } from 'sonner';
import { signUp, verifyEmail } from '@/lib/auth-client';
import { createClient } from '@/lib/supabase/client';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { FormHeader, PasswordField, SubmitButton, FormLabelStyle, InputStyle } from './FormComponents';
import { formSignUpSchema } from './ValidationSchemas';
import VerifiableEmailField from './VerifiableEmailField';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface SignUpContentProps {
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpContent = ({ setIsSignin }: SignUpContentProps) => {
  const inputAddressRef = useRef<any>(null);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const supabase = createClient();
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    name: "",
    surname: "",
    address: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues,
  });

  // Function to verify if email exists using Better Auth's email-check endpoint
  const verifyEmailExists = async (email: string) => {
    try {
      // Check if the email is available (not registered)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/email-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      // If email is not available, it means it already exists
      if (!data.available) {
        form.setError('email', { 
          message: 'This email is already registered. Please use a different email.' 
        });
        return true; // Email exists
      }
      
      return false; // Email doesn't exist
    } catch (error) {
      console.error('Error checking email availability:', error);
      return false; // Assume email doesn't exist on error
    }
  };

  const {
    placePredictions,
    getPlacePredictions,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onSubmit = async (values: z.infer<typeof formSignUpSchema>) => {
    const { email, name, surname, password, address, tel } = values;
    
    setLoading(true);
    
    // First verify if email already exists
    const emailExists = await verifyEmailExists(email);
    if (emailExists) {
      setLoading(false);
      return;
    }

    // Use signUp.email from auth-client with auto sign-in after verification
    await signUp.email({
      email,
      password,
      name: `${name} ${surname}`,
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
        onSuccess: async () => {
          try {
            // Send verification email with auto sign-in link
            toast.success("Your account has been created. Please check your email to verify your account.");
            
            // Close the modal
            dispatch(setLoginModalDisplay(false));
            
            console.log('Success SIGNUP');
            setLoading(false);
          } catch (verifyError) {
            console.error("Error sending verification email:", verifyError);
            toast.error("Account created but there was an issue sending the verification email");
            setLoading(false);
          }
        },
      },
    });
  };

  const renderItemAddress = (address: string) => (
    <span key={address}
      className='cursor-pointer font-poppins text-sm py-2.5 px-1.5 bg-[#525252] border-b-[0.5px] border-[#a6a6a6] text-[#D9D9D9] hover:bg-[#313130]'
      onClick={() => {
        setCurrentAddress(address);
        form.setValue('address', address);
        getPlacePredictions({ input: "" });
      }}>
      {address}
    </span>
  );

  return (
    <>
      <FormHeader
        title="Create an account"
        subtitle="Already a member of InRealArt?"
        linkText="Sign in!"
        onLinkClick={() => setIsSignin(true)}
      />
      <Form {...form}>
        <form className="w-full max-w-[420px] mx-auto mt-[15px]" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className={FormLabelStyle}>First name *</FormLabel>
                  <FormControl>
                    <Input className={InputStyle} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className={FormLabelStyle}>Last name *</FormLabel>
                  <FormControl>
                    <Input className={InputStyle} placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
                </FormItem>
              )}
            />
          </div>
          
          <VerifiableEmailField form={form} onVerify={verifyEmailExists} />
          
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className={FormLabelStyle}>Phone *</FormLabel>
                <FormControl>
                  <div className="mt-[15px] inline-block w-full">
                    <PhoneInput
                      international
                      defaultCountry="FR"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className="text-white rounded-[10px] border-2 border-[#b39e73] bg-transparent w-full h-[64px] font-poppins text-[18px] tracking-[-0.25px] focus-within:ring-0"
                    />
                  </div>
                </FormControl>
                <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className={FormLabelStyle}>Address *</FormLabel>
                <FormControl>
                  <Input
                    className={InputStyle}
                    placeholder="Search an address"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      getPlacePredictions({ input: e.target.value });
                    }}
                  />
                </FormControl>
                {currentAddress !== '' && (
                  <p className="text-white bg-[#2C2C2C] p-2 text-sm mt-2 rounded-lg">{currentAddress}</p>
                )}
                {placePredictions.length > 0 && (
                  <div className="flex flex-col justify-center absolute top-[64px] z-[100] w-full mt-[5px] rounded-[10px]">
                    {placePredictions.map(({ description }) => renderItemAddress(description))}
                  </div>
                )}
                <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
              </FormItem>
            )}
          />

          <PasswordField form={form} label="Password *" />
          <PasswordField form={form} name="confirmPassword" label="Confirm password *" />
          
          <SubmitButton
            loading={loading}
            text="Sign up"
            loadingText="Loading..."
          />
        </form>
      </Form>
    </>
  );
};

export default SignUpContent; 