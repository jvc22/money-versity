import './globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'money.versity',
  description: 'Your cash dashboard application.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div className="max-w-6xl mx-auto p-5 flex flex-col gap-8">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
