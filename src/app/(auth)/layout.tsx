import '../globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'money.versity',
  description: 'Sign in to manage your wallet transactions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="text-lg text-foreground">
          <span className="font-semibold">money.versity</span>
        </div>
        <footer className="text-sm">
          Partner panel &copy; money.versity - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
