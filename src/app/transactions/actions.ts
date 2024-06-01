'use server'

import { env } from '@/lib/env'

import { CreateTransactionFormData } from './transactions-form'

export async function fetchCategories() {
  const response = await fetch(`${env.API_BASE_URL}/categories`, {
    next: {
      tags: ['categories'],
    },
  })

  const data = await response.json()

  return data
}

export async function createTransaction(data: CreateTransactionFormData) {
  const response = await fetch(`${env.API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  return {
    status: response.status,
    data: responseData,
  }
}
