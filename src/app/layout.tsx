import type { Metadata } from 'next'

import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme/theme-provider'

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
          'min-h-screen bg-background font-sans antialiased max-w-6xl mx-auto p-5 flex flex-col gap-5',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
