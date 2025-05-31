import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormLabelStyle, InputStyle } from './FormComponents';

interface VerifiableEmailFieldProps {
  form: UseFormReturn<any>;
  onVerify: (email: string) => Promise<boolean>;
}

const VerifiableEmailField = ({ form, onVerify }: VerifiableEmailFieldProps) => {
  const [verifying, setVerifying] = useState(false);

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="relative w-full">
          <FormLabel className={FormLabelStyle}>Email *</FormLabel>
          <FormControl>
            <Input 
              className={InputStyle} 
              placeholder="johndoe@example.com" 
              {...field} 
              onChange={(e) => {
                field.onChange(e);
                // Clear error when user types
                if (form.formState.errors.email) {
                  form.clearErrors('email');
                }
              }}
              onBlur={async (e) => {
                field.onBlur();
                // Verify email when user moves away from the field
                if (e.target.value && !form.formState.errors.email) {
                  setVerifying(true);
                  await onVerify(e.target.value);
                  setVerifying(false);
                }
              }}
            />
          </FormControl>
          <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
          {verifying && (
            <span className="font-poppins text-[12px] text-[#b39e73] mt-[2px]">
              Verifying email...
            </span>
          )}
        </FormItem>
      )}
    />
  );
};

export default VerifiableEmailField; 