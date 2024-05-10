"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signUp, signIn, getLoggedInUser } from '@/lib/actions/user.actions'

// zod form schema

  


const AuthForm = ({type}: {type: string}) => {
   const router = useRouter()
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(false)

   const formSchema = authFormSchema(type);

   const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })
    
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        
        try {
            //Signup with appwrite & create plaid link token
            if (type === 'sign-up') {
                const newUser = await signUp(data);
                setUser(newUser)
            }

            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })

                if (response) router.push('/')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        
        }
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className="cursor-pointer flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='Horizon Logo'
                />
                <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user
                        ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Sign In'
                            : 'Sign Up'
                    }
                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    {user
                        ? 'Link your account to get started'
                        : 'Please enter your details'
                    }
                </p>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                {/* PlaidLink */}
            </div>
        ): (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* if this is the sign up route render these additional(&&) fields */}
                        {type === 'sign-up' && (
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput 
                                        label='First Name'
                                        placeholder='Enter your first name.'
                                        name='firstName'
                                        control={form.control}
                                    />

                                    <CustomInput 
                                        label='Last Name'
                                        placeholder='Enter your last name.'
                                        name='lastName'
                                        control={form.control}
                                    />
                                </div>

                                <CustomInput 
                                    label='Address'
                                    placeholder='Enter your address.'
                                    name='address1'
                                    control={form.control}
                                />

                                <CustomInput 
                                    label='City'
                                    placeholder='Enter your city.'
                                    name='city'
                                    control={form.control}
                                />

                                <div className='flex gap-4'>
                                    <CustomInput 
                                        label='State'
                                        placeholder='ex: NY'
                                        name='state'
                                        control={form.control}
                                    />

                                    <CustomInput 
                                        label='Postal Code'
                                        placeholder='ex: 11101'
                                        name='postalCode'
                                        control={form.control}
                                    />
                                </div>

                                <div className='flex gap-4'>
                                    <CustomInput 
                                        label='Date of Birth'
                                        placeholder='yyyy-mm-dd'
                                        name='dateOfBirth'
                                        control={form.control}
                                    />

                                    <CustomInput 
                                        label='SSN'
                                        placeholder='ex: 1234'
                                        name='ssn'
                                        control={form.control}
                                    />
                                </div>
                            </>
                        )}




                        <CustomInput 
                            label='Email'
                            placeholder='Enter your email.'
                            name='email'
                            control={form.control}
                        />

                        <CustomInput 
                            label='Password'
                            placeholder='Enter your password.'
                            name='password'
                            control={form.control}
                        />


                        <div className='flex flex-col gap-4'>
                            <Button 
                            type="submit"
                            disabled={isLoading}
                            className='form-btn'>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin'/> &nbsp;
                                        Loading...
                                    </>
                                ) : type === 'sign-in'
                                ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </div>

                    </form>
                </Form>

                <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>
                        {type === 'sign-in'
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    </p>
                    <Link className='form-link' href={type === 'sign-in' ? '/sign-up'
                                : '/sign-in'}>
                        {type === 'sign-in' ? 'Sign Up'
                                : 'Sign In'}
                    </Link>
                </footer>

            </>
        )}
    </section>
  )
}

export default AuthForm