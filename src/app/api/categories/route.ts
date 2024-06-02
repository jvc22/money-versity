import { NextResponse } from 'next/server'
import { z } from 'zod'

import { env } from '@/lib/env'

export async function GET() {
  const categoriesSchema = z.array(
    z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
    }),
  )

  const response = await fetch(`${env.API_BASE_URL}/categories`)

  const categories = await response.json()

  const safeResponse = categoriesSchema.safeParse(categories)
  if (!safeResponse.success) {
    console.error(safeResponse.error.format)
    return
  }

  return NextResponse.json(safeResponse.data, { status: 200 })
}
