import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

type RouteParams = {
  id: string
}

function parseParams(routeParams: RouteParams) {
  const paramsSchema = z.object({
    params: z.object({
      id: z.string().cuid(),
    }),
  })

  const safeParams = paramsSchema.safeParse(routeParams)
  if (!safeParams.success) {
    console.error(safeParams.error)
    throw new Error()
  }

  return safeParams.data.params.id
}

export async function GET(request: Request, params: RouteParams) {
  const transactionId = parseParams(params)

  const transaction = await prisma.transactions.findUnique({
    where: {
      id: transactionId,
    },
    select: {
      id: true,
      createdAtTz: true,
      amount: true,
      status: true,
      category: true,
      description: true,
    },
  })

  if (transaction) {
    return NextResponse.json(transaction, { status: 200 })
  }

  return NextResponse.json({}, { status: 404 })
}

export async function PUT(request: Request, params: RouteParams) {
  const transactionId = parseParams(params)

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

  const editedTransaction = {
    createdAtTz: new Date(safeBody.data.date),
    amount: Math.round(safeBody.data.amount * 100) / 100,
    status: safeBody.data.status,
    categoryId: safeBody.data.categoryId,
    description: safeBody.data.description,
  }

  const updatedTransaction = await prisma.transactions.update({
    where: {
      id: transactionId,
    },
    data: editedTransaction,
  })

  if (updatedTransaction) {
    return NextResponse.json(updatedTransaction.id, { status: 200 })
  }

  return NextResponse.json({}, { status: 404 })
}

export async function DELETE(request: Request, params: RouteParams) {
  const transactionId = parseParams(params)

  const transaction = await prisma.transactions.delete({
    where: {
      id: transactionId,
    },
  })

  if (transaction) {
    return NextResponse.json(transaction.id, { status: 200 })
  }

  return NextResponse.json({}, { status: 404 })
}
