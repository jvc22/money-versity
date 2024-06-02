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
  }

  return NextResponse.json(safeResponse.data, { status: 200 })
}
