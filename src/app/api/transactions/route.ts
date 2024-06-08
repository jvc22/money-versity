import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const transactions = await prisma.transactions.findMany({
    select: {
      id: true,
      createdAtTz: true,
      amount: true,
      status: true,
      category: {
        select: {
          id: true,
          value: true,
          label: true,
        },
      },
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (transactions) {
    return NextResponse.json(transactions, { status: 200 })
  }

  return NextResponse.json({}, { status: 404 })
}

export async function POST(request: Request) {
  const formData = await request.json()

  const bodySchema = z.object({
    date: z.string(),
    amount: z.number(),
    status: z.enum(['income', 'outcome']),
    categoryId: z.number(),
    description: z.string(),
  })

  const safeBody = bodySchema.safeParse(formData)
  if (!safeBody.success) {
    console.error(safeBody.error)
    throw new Error()
  }

  const newTransaction = {
    createdAtTz: new Date(safeBody.data.date),
    amount: Math.round(safeBody.data.amount * 100) / 100,
    status: safeBody.data.status,
    categoryId: safeBody.data.categoryId,
    description: safeBody.data.description,
  }

  const transaction = await prisma.transactions.create({
    data: newTransaction,
  })

  if (transaction) {
    return NextResponse.json(transaction.id, { status: 201 })
  }

  return NextResponse.json({}, { status: 400 })
}
