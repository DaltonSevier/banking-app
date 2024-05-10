import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from "@/components/ui/input"

import {Control, FieldPath} from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
}

const CustomInput = ({label, placeholder, name, control}: CustomInputProps) => {
  return (
    <div>
      <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>
                                    {label}
                                </FormLabel>
                                <div className='flex w-full flex-col'>
                                    <FormControl>
                                        <Input 
                                            placeholder={placeholder}
                                            className='input-class'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='form-message mt-2'/>
                                </div>
                            </div>
                        )}
                        />
    </div>
  )
}

export default CustomInput