import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link href="/sign-up">New wallet account</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Access panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your transactions and control your money!
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your e-mail</Label>
            <Input id="email" type="email" autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your secret password</Label>
            <Input id="password" type="password" />
          </div>

          <Button className="w-full" type="submit">
            Access panel
          </Button>
        </form>
      </div>
    </div>
  )
}
