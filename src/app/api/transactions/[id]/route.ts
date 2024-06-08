import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

type RouteParams = {
  id: string
}

export async function DELETE(
  request: Request,
  { params }: { params: RouteParams },
) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const safeParams = paramsSchema.safeParse(params)
  if (!safeParams.success) {
    console.error(safeParams.error)
    throw new Error()
  }

  const transaction = await prisma.transactions.delete({
    where: {
      id: safeParams.data.id,
    },
  })

  if (transaction) {
    return NextResponse.json(transaction.id, { status: 200 })
  }

  return NextResponse.json({}, { status: 404 })
}
