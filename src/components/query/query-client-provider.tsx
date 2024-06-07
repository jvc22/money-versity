'use client'

import {
  QueryClient,
  QueryClientProvider as RQueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
          },
        },
      }),
  )

  return (
    <RQueryClientProvider client={queryClient}>{children}</RQueryClientProvider>
  )
}
