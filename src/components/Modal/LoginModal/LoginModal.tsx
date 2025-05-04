'use client'
import React, { useRef, useState } from 'react';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Modal from '@/components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isLoginModalDisplay } from '@/redux/reducers/modals/selectors';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import Image from 'next/image';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import Button from '../../Button/Button';
import { Input } from '../../ui/input';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { verifyCaptcha } from '@/lib/captcha/functions';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { PostDataSingleMailing } from '@/types_mailing';
import { signIn, signUp } from "@/lib/auth-client";

// Label styling constant
const FormLabelStyle = "absolute font-montserrat text-[14px] tracking-[0px] z-10 top-[5px] left-[35px] bg-[#313130] px-[10px]";

// Input styling constant
const InputStyle = "text-white rounded-[10px] border-2 border-[#b39e73] bg-transparent w-full h-[64px] py-[10px] px-[15px] font-poppins text-[18px] tracking-[-0.25px] mt-[15px] focus:bg-transparent focus:outline-none";

const phoneValidation = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSignInSchema = z.object({
  email: z.string().min(2, {
    message: "Email required.",
  }).email({
    message: 'Must be a valid email',
  }),
  password: z.string().min(2, {
    message: "Password required.",
  })
});

const formSignUpSchema = z.object({
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
  tel: z.string().min(2, {
    message: "Tel is required.",
  }).regex(phoneValidation, { message: 'invalid phone number' }),
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
})

interface LoginModalProps {
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>
}

//-------------------------------------------------------------------- sendMail
const sendMail = async (paramsEmail: Partial<PostDataSingleMailing>) => {
  try {
    const response = await fetch("/api/mailing", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsEmail)
    })

    const data = await response.json()
    console.log('Data returned after sending mail', data)
    return data
  } catch (error) {
    console.error("Error sendMail:", error)
  }
}


const LoginModalSignUpContent = ({ setIsSignin }: LoginModalProps) => {
  const inputAddressRef = useRef<any>(null)
  const [currentAddress, setCurrentAddress] = useState<string>("")
  const supabase = createClient()
  const dispatch = useAppDispatch()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    name: "",
    surname: "",
    address: "",
    email: "",
    password: "",
  };

  const form = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues,
  });

  const {
    placePredictions,
    getPlacePredictions,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  async function onSubmit(values: z.infer<typeof formSignUpSchema>) {
    const { email, name, surname, password, address, tel } = values
    
    setLoading(true)
    //STEP 1 : Verifiy Captcha
    // const dataCaptcha = await verifyCaptcha(executeRecaptcha)
    //console.log('dataCaptcha : ', dataCaptcha)
    // if (dataCaptcha.success === false) {
    //   return toast.error('According to Captcha system, you seems to be a robot and not human !')
    // }

    //STEP 2 : Send Email Confirmation
    //@TODO : Uncomment this when we have a real email
    /*
    const dataMail = await sendMail({
      to: email,
      params: {name: name, surname: surname},
      templateName: 'MarketplaceAccountCreationConfirmation'
    })
    
    console.log('DATA EMAIL : ', dataMail)
    if (dataMail.mailSent === false) {
      return toast.error('Unable to send you an e-mail ... Try later please')
    }
    */

    //STEP 3 : USE BETTER-AUTH
    await signUp.email({
      email,
      password,
      name: `${name} ${surname}`,
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false)
        },
        onSuccess: async () => {
          dispatch(setLoginModalDisplay(false))
          toast.success("Your account have been created")
          console.log('Success SIGNUP')
          setLoading(false)
        },
      },
    });

    
  }

  const renderItemAddress = (address: string) => (
    <span key={address}
      className='cursor-pointer font-poppins text-sm py-2.5 px-1.5 bg-[#525252] border-b-[0.5px] border-[#a6a6a6] text-[#D9D9D9] hover:bg-[#313130]'
      onClick={() => {
        setCurrentAddress(address)
        form.setValue('address', address);
        getPlacePredictions({ input: "" })
      }} >{address}</span>
  )

  return (
    <>
      <div className="mt-[30px]">
        <h1 className="font-montserrat text-[28px] tracking-[0px] font-bold text-white md:text-[48px]">
          Create an account
        </h1>
        <p className="font-poppins text-[14px] font-normal text-left mt-[2px] mb-[2px]">Already a member of InRealArt?</p>
        <span 
          className="font-poppins text-[14px] text-[#b39e73] cursor-pointer" 
          onClick={() => setIsSignin(true)}
        >
          Sign in !
        </span>
      </div>
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className={FormLabelStyle}>Email *</FormLabel>
                <FormControl>
                  <Input className={InputStyle} placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className={FormLabelStyle}>Phone *</FormLabel>
                <FormControl>
                  <Input className={InputStyle} placeholder="+33612345678" {...field} />
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
                  <div className="flex flex-col justify-center absolute top-20 z-100 w-full mt-[5px] rounded-[10px]">
                    {placePredictions.map(({ description }) => renderItemAddress(description))}
                  </div>
                )}
                <FormMessage className="font-poppins text-[14px] text-[#9d4141] mt-[5px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className={FormLabelStyle}>Password *</FormLabel>
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
                <FormLabel className={FormLabelStyle}>Confirm password *</FormLabel>
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
            text={loading ? 'Loading...' : 'Sign up'}
            additionalClassName="login"
            className="w-full mt-5"
            disabled={loading}
          />
        </form>
      </Form>
    </>
  );
};

const LoginModalSignInContent = ({ setIsSignin }: LoginModalProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSignInSchema>) {
    const { email, password } = values

    await signIn.email({
      email,
      password,
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false)
        },
        onSuccess: async () => {
          dispatch(setLoginModalDisplay(false))
          toast.success("You are connected !")
        },
      },
    });

    
  }

  return (
    <>
      <div className="mt-[30px]">
        <h1 className="font-montserrat text-[28px] tracking-[0px] font-bold text-white md:text-[48px]">
          Welcome to In Real Art
        </h1>
        <p className="font-poppins text-[14px] font-normal text-left mt-[2px] mb-[2px]">Don't have an account?</p>
        <span 
          className="font-poppins text-[14px] text-[#b39e73] cursor-pointer" 
          onClick={() => setIsSignin(false)}
        >
          Create one
        </span>
      </div>
      <Form {...form}>
        <form className="w-full max-w-[300px] mx-auto mt-[15px]" onSubmit={form.handleSubmit(onSubmit)}>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className={FormLabelStyle}>Password</FormLabel>
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
            text={loading ? 'Loading...' : 'Sign in'}
            additionalClassName="login"
            className="w-full mt-5"
            disabled={loading}
          />
        </form>
      </Form>
    </>
  );
};

const LoginModal = () => {
  const isLoginModalOpen = useAppSelector(isLoginModalDisplay);
  const dispatch = useAppDispatch();
  const [isSignin, setIsSignin] = useState<boolean>(true);

  return (
    <Modal
      title={''}
      show={isLoginModalOpen}
      hide={() => {
        dispatch(setLoginModalDisplay(false));
      }}
      additionalClassName="login"
      withoutHeader
    >
      <div className="pb-[50px] max-h-[90vh] overflow-hidden">
        <Image
          src="/images/LoginHeader.png"
          width={740}
          height={200}
          alt="HeaderLoginModal"
          className="w-full h-auto rounded-t-[20px] md:w-full md:h-[100px]"
        />
        <div className="flex flex-col items-center w-[75%] mx-auto max-h-[78vh] overflow-x-hidden overflow-y-scroll md:w-[85%]">
          {isSignin ? (
            <LoginModalSignInContent
              setIsSignin={setIsSignin}
            />
          ) : (
            <LoginModalSignUpContent
              setIsSignin={setIsSignin}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
