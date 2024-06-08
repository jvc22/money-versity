import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { createUrlWithParams } from '@/utils/url-params'

interface Transaction {
  id: string
  createdAtTz: Date
  amount: number
  status: 'income' | 'outcome'
  category: {
    id: number
    value: string
    label: string
  }
  description: string
}

interface useTransactionsProps {
  params: {
    [key: string]: string | null
  }
}

export function useTransactions({ params }: useTransactionsProps) {
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const urlWithParams = createUrlWithParams('/transactions', params)

      const response = await api.get(urlWithParams)

      return response.data
    },
    placeholderData: keepPreviousData,
  })

  return transactions || []
}
