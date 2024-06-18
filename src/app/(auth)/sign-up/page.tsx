'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name should have at least 3 characters.' })
      .max(64, { message: 'Name should have a maximum of 64 characters.' }),
    email: z.string().email({ message: 'Provide a valid e-mail.' }),
    password: z
      .string()
      .min(8, { message: 'Password should have at least 8 characters.' }),
    confirm: z.string(),
  })
  .refine((data) => data.confirm === data.password, {
    message: 'Both passwords must match.',
    path: ['confirm'],
  })

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleCreateNewAccount(formData: SignUpFormSchema) {
    const status = await signUp(formData)

    if (status === 201) {
      toast.success('New account created successfully.')
      reset()
    } else if (status === 403) {
      toast.warning('E-mail already in use.')
    } else {
      toast.error('An error has occurred. Try again later.')
    }
  }

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message)
    } else if (errors.email) {
      toast.error(errors.email.message)
    } else if (errors.password) {
      toast.error(errors.password.message)
    } else if (errors.confirm) {
      toast.error(errors.confirm.message)
    }
  }, [errors])

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link href="/sign-in">Acess your account</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create free account
          </h1>
          <p className="text-sm text-muted-foreground">
            Become a partner and start to track your money!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateNewAccount)}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="restaurantName">Full name</Label>
            <Input
              {...register('name')}
              id="restaurantName"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register('password')}
              id="password"
              type="password"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              {...register('confirm')}
              id="confirm"
              type="password"
              autoComplete="off"
            />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Complete registration
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            By continuing, you agree to our{' '}
            <a className="underline underline-offset-4" href="">
              terms of service
            </a>{' '}
            and{' '}
            <a className="underline underline-offset-4" href="">
              privacy policies.
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  )
}
