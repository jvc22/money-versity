import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUp() {
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

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Full name</Label>
            <Input id="restaurantName" type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" />
          </div>

          <Button className="w-full" type="submit">
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
