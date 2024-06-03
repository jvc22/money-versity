import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const categoriesSchema = z.array(
    z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
    }),
  )

  const categories = await prisma.categories.findMany()

  const safeResponse = categoriesSchema.safeParse(categories)
  if (!safeResponse.success) {
    console.error(safeResponse.error.format)
    return
  }

  return NextResponse.json(safeResponse.data, { status: 200 })
}
