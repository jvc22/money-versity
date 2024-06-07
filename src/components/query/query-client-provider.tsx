'use client'

import {
  QueryClient,
  QueryClientProvider as RQueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RQueryClientProvider client={queryClient}>{children}</RQueryClientProvider>
  )
}
