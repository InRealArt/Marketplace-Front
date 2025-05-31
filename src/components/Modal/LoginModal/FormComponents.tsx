import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import Button from '@/components/Button/Button';

// Shared styling constants
export const FormLabelStyle = "absolute font-montserrat text-[14px] tracking-[0px] z-10 top-[5px] left-[35px] bg-[#313130] px-[10px]";
export const InputStyle = "text-white rounded-[10px] border-2 border-[#b39e73] bg-transparent w-full h-[64px] py-[10px] px-[15px] font-poppins text-[18px] tracking-[-0.25px] mt-[15px] focus:bg-transparent focus:outline-none";

// Email input component
export const EmailField = ({ form }: { form: UseFormReturn<any> }) => (
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem className="relative w-full">
        <FormLabel className={FormLabelStyle}>Email</FormLabel>
        <FormControl>
          <Input className={InputStyle} placeholder="johndoe@example.com" {...field} />
        </FormControl>
        <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
      </FormItem>
    )}
  />
);

// Password input component
export const PasswordField = ({ 
  form, 
  name = "password", 
  label = "Password",
  showForgotPassword = false,
  onForgotPasswordClick
}: { 
  form: UseFormReturn<any>,
  name?: string,
  label?: string,
  showForgotPassword?: boolean,
  onForgotPasswordClick?: () => void
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="relative w-full">
        <FormLabel className={FormLabelStyle}>{label}</FormLabel>
        <FormControl>
          <Input
            type="password"
            className={InputStyle}
            placeholder="***********"
            {...field}
          />
        </FormControl>
        <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
        {showForgotPassword && onForgotPasswordClick && (
          <div className="flex justify-end mt-2">
            <button 
              type="button"
              onClick={onForgotPasswordClick}
              className="font-poppins text-[12px] text-[#b39e73] hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}
      </FormItem>
    )}
  />
);

// Submit button component
export const SubmitButton = ({ 
  loading, 
  text, 
  loadingText 
}: { 
  loading: boolean, 
  text: string,
  loadingText: string
}) => (
  <Button
    type="submit"
    text={loading ? loadingText : text}
    additionalClassName="login"
    className="w-full mt-5"
    disabled={loading}
  />
);

// Header component for all form sections
export const FormHeader = ({ 
  title, 
  subtitle, 
  linkText, 
  onLinkClick 
}: { 
  title: string, 
  subtitle: string, 
  linkText: string, 
  onLinkClick: () => void 
}) => (
  <div className="mt-[30px]">
    <h1 className="font-montserrat text-[28px] tracking-[0px] font-bold text-white md:text-[48px]">
      {title}
    </h1>
    <p className="font-poppins text-[14px] font-normal text-left mt-[2px] mb-[2px]">{subtitle}</p>
    <span 
      className="font-poppins text-[14px] text-[#b39e73] cursor-pointer" 
      onClick={onLinkClick}
    >
      {linkText}
    </span>
  </div>
); 