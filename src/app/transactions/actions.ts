'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { env } from '@/lib/env'

import { CreateTransactionFormData } from './transactions-form'

export async function createTransaction(data: CreateTransactionFormData) {
  const newTransaction = {
    createdAt: data.date,
    amount: Math.round(data.amount * 100) / 100,
    status: data.status,
    category: data.category,
    description: data.description,
  }

  const response = await fetch(`${env.API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  })

  revalidateTag('transactions')

  return {
    status: response.status,
  }
}

export async function fetchTransactions() {
  const responseSchema = z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      amount: z.number(),
      status: z.enum(['income', 'outcome']),
      category: z.string(),
      description: z.string(),
    }),
  )

  const response = await fetch(`${env.API_BASE_URL}/transactions`, {
    next: {
      tags: ['transactions'],
    },
  })

  const data = await response.json()

  const safeResponse = responseSchema.safeParse(data)
  if (!safeResponse.success) {
    console.error(safeResponse.error.format)
  }

  return safeResponse.data || []
}
