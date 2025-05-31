import { z } from "zod";

// Regular expressions for validation
export const phoneValidation = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

// Sign in form schema
export const formSignInSchema = z.object({
  email: z.string().min(2, {
    message: "Email required.",
  }).email({
    message: 'Must be a valid email',
  }),
  password: z.string().min(2, {
    message: "Password required.",
  })
});

// Sign up form schema
export const formSignUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  surname: z.string().min(2, {
    message: "Surname is required.",
  }),
  email: z.string().min(2, {
    message: "Email is required.",
  }).email({
    message: 'Must be a valid email',
  }),
  tel: z.string().min(5, {
    message: "Phone number is required.",
  }).refine((val) => {
    // The library returns phone numbers in E.164 format (e.g., +33612345678)
    // This basic validation checks if it starts with + and has at least 5 digits
    return /^\+[0-9]{5,}$/.test(val);
  }, { 
    message: 'Please enter a valid phone number' 
  }),
  address: z.string().min(2, {
    message: "Address is required.",
  }),
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

// Forgot password form schema
export const forgotPasswordSchema = z.object({
  email: z.string().min(2, {
    message: "Email required.",
  }).email({
    message: 'Must be a valid email',
  })
}); 