import '../globals.css'

import type { Metadata } from 'next'

import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Dashboard | money.versity',
  description: 'Visualize all your cash data in just one place.',
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
