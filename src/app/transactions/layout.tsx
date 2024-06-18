import '../globals.css'

import type { Metadata } from 'next'

import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Transactions | money.versity',
  description:
    'Create, edit, and delete transactions and search for your history.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-5">
      <Header />
      {children}
    </div>
  )
}
