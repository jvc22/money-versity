import { NextResponse } from 'next/server'
import { z } from 'zod'

import { env } from '@/lib/env'

export async function GET() {
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

  const response = await fetch(`${env.API_BASE_URL}/transactions`)

  const transactions = await response.json()

  const safeResponse = responseSchema.safeParse(transactions)
  if (!safeResponse.success) {
    console.error(safeResponse.error.format)
    return
  }

  return NextResponse.json(safeResponse.data, { status: 200 })
}

export async function POST(request: Request) {
  const { formData } = await request.json()

  const bodySchema = z.object({
    date: z.string(),
    amount: z.number(),
    status: z.enum(['income', 'outcome']),
    category: z.string(),
    description: z.string(),
  })

  const safeBody = bodySchema.safeParse(formData)
  if (!safeBody.success) {
    console.error(safeBody.error.format)
    throw new Error()
  }

  const newTransaction = {
    createdAt: formData.date,
    amount: Math.round(formData.amount * 100) / 100,
    status: formData.status,
    category: formData.category,
    description: formData.description,
  }

  const response = await fetch(`${env.API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  })

  return NextResponse.json(response.body, { status: response.status })
}
