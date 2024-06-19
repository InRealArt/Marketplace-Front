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
import { setUserInfos } from '@/redux/reducers/user/reducer';
import { createClient } from '@/lib/supabase/client';
import { createProfile } from '@/lib/profiles';
import { UserRoles } from '@prisma/client';
import { verifyCaptcha } from '@/lib/captcha/functions';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { PostDataSingleMailing } from '@/types_mailing';

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
    
    //STEP 1 : Verifiy Captcha
    const dataCaptcha = await verifyCaptcha(executeRecaptcha)
    console.log('dataCaptcha : ', dataCaptcha)
    if (dataCaptcha.success === false) {
      return toast.error('According to Captcha system, you seems to be a robot and not human !')
    }

    //STEP 2 : Send Email Confirmation
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

    //STEP 3 : Create User in DB
    if (values) {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            surname,
            address,
            tel
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        },
      });
      if (error) {
        form.setError("confirmPassword", error)
        toast.error("An error has occured")
      } else {
        const { user } = data
        const { address, name, surname, tel } = user?.user_metadata || {}
        if (user?.id) {
          dispatch(setUserInfos({ id: user.id, role: UserRoles.SELLER, orderIds: [], email: user?.email, name, address, surname, tel }))
          await createProfile({
            userId: user.id,
            userRole: UserRoles.SELLER
          })
          form.reset(defaultValues);
          dispatch(setLoginModalDisplay(false))
          toast.success("Your account have been created")
        }
      }
    }
  }

  const renderItemAddress = (address: string) => (
    <span key={address}
      className='LoginModal__addressDescription'
      onClick={() => {
        setCurrentAddress(address)
        form.setValue('address', address);
        getPlacePredictions({ input: "" })
      }} >{address}</span>
  )

  return (
    <>
      <div className='LoginModal__infos'>
        <h1 className='LoginModal__title'>
          Create an account
        </h1>
        <p className='LoginModal__description'>Do you already have an account with InRealArt ?</p>
        <span className='LoginModal__link' onClick={() => setIsSignin(true)}>Sign in</span>
      </div>
      <Form {...form}>
        <form className='LoginModal__form LoginModal__form--signup' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Name *</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' placeholder="Name" {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Surname *</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' placeholder="Surname" {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Email address *</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' placeholder="inrealart@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Phone number *</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' placeholder="+330600000000" {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Adresse postal *</FormLabel>
                <FormControl>
                  <Input
                    ref={inputAddressRef}
                    className='LoginModal__input'
                    placeholder="3 street...."
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setCurrentAddress(e.target.value)
                      getPlacePredictions({ input: e.target.value })
                    }}
                    value={currentAddress}
                    name={field.name}
                  />
                </FormControl>
                <div className='LoginModal__addressResult'>{placePredictions.map((item) => renderItemAddress(item.description))}</div>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Password *</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' type='password' placeholder="Password" {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Confirm Password</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' type='password' placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <Button text='Sign up' type="submit" additionalClassName='login' />
        </form>
      </Form>
    </>
  )
}

const LoginModalSignInContent = ({ setIsSignin }: LoginModalProps) => {
  const supabase = createClient()
  const dispatch = useAppDispatch()

  const defaultValues = {
    email: "",
    password: ""
  };

  const form = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSignInSchema>) {
    const { email, password } = values

    if (values) {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log(error);
        form.setError("password", error)
        toast.error("An error has occured")
      } else {
        const { user } = data
        const { address, name, surname, tel } = user?.user_metadata || {}
        dispatch(setUserInfos({ id: user.id, role: UserRoles.SELLER, orderIds: [], email: user?.email, name, address, surname, tel }))
        dispatch(setLoginModalDisplay(false))
        toast.success("You are connected")
      }
    }
  }

  return (
    <>
      <div className='LoginModal__infos'>
        <h1 className='LoginModal__title'>
          Connexion
        </h1>
        <p className='LoginModal__description'>Are you not yet a member of InRealArt?</p>
        <span className='LoginModal__link' onClick={() => setIsSignin(false)}>Sign up !</span>
      </div>
      <Form {...form}>
        <form className='LoginModal__form' onSubmit={form.handleSubmit(onSubmit)} >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Email Address</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' placeholder="inrealart@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className='LoginModal__formItem'>
                <FormLabel className='LoginModal__label'>Password</FormLabel>
                <FormControl>
                  <Input className='LoginModal__input' placeholder="Password" type='password' {...field} />
                </FormControl>
                <FormMessage className="LoginModal__errorMessage" />
              </FormItem>
            )}
          />
          <Button text='Sign in' type="submit" additionalClassName='login' />
        </form>
      </Form>
    </>
  )
}

const LoginModal = () => {
  const [isSignin, setIsSignin] = useState(true)
  const showLoginModal = useAppSelector((state) => isLoginModalDisplay(state))
  const dispatch = useAppDispatch()

  return (<Modal
    additionalClassName='login'
    title={""}
    show={showLoginModal}
    hide={() => dispatch(setLoginModalDisplay(false))}
  >
    <div className="LoginModal">
      <Image
        className="LoginModal__introImg"
        priority={true}
        alt="LoginHeader"
        src="/images/LoginHeader.png"
        width={1042}
        height={173}
      />
      <div className="LoginModal__content">
        {isSignin ? <LoginModalSignInContent setIsSignin={setIsSignin} /> : <LoginModalSignUpContent setIsSignin={setIsSignin} />}
      </div>
    </div>
  </Modal>
  )
};

export default LoginModal;
