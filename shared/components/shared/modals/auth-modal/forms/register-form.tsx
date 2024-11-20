import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Title } from '../../..';
import Image from 'next/image';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';
import { signIn } from 'next-auth/react';


interface Props {
    onClose: VoidFunction;
    className?: string;
}
export const RegisterForm: FC<Props> = ({ className, onClose }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password
            })



            // TO DO: Log in!!
            const respons = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if (!respons?.ok) {
                throw Error();
            }

            toast.success('Registered successfully. Check your email, to verify your account', { icon: '✅' });

            onClose?.();
        } catch (error) {
            console.error('Error [REGISTER]', error);
            toast.error('Something went wrong', { icon: '❌' });
        }
    }
    return (
        <FormProvider {...form}>
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex justify-between items-center'>
                    <div className='mr-2'>
                        <Title text='Sign in' size='md' className='font-bold' />
                        <p className='text-gray-400'>Please enter your details</p>
                    </div>
                    <Image src='/assets/images/phone-icon.png' alt='phone-icon' width={60} height={60} />
                </div>
                <FormInput name='email' label='E-mail' required />
                <FormInput name='fullName' label='Full name' required />
                <FormInput name='password' label='Password' type='password' required />
                <FormInput name='confirmPassword' label='Confirm password' type='password' required />


                <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
                    Register
                </Button>
            </form>
        </FormProvider>
    )
}
