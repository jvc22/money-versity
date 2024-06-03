import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

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

  const transactions = await prisma.transactions.findMany()

  const safeResponse = responseSchema.safeParse(transactions)
  if (!safeResponse.success) {
    console.error(safeResponse.error.format)
    throw new Error()
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

  const transaction = await prisma.transactions.create({
    data: newTransaction,
  })

  if (transaction) {
    return NextResponse.json(transaction.id, { status: 201 })
  }

  return NextResponse.json({}, { status: 400 })
}
