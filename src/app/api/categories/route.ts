import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.categories.findMany()

  if (categories) {
    return NextResponse.json(categories, { status: 200 })
  }

  return NextResponse.json({}, { status: 404 })
}

export async function POST(request: Request) {
  const formData = await request.json()

  const bodySchema = z.object({
    label: z.string(),
    createdAt: z.string(),
  })

  const safeBody = bodySchema.safeParse(formData)
  if (!safeBody.success) {
    console.error(safeBody.error)
    throw new Error()
  }

  const newCategory = {
    value: safeBody.data.label.toLocaleLowerCase(),
    label: safeBody.data.label,
    createdAt: new Date(safeBody.data.createdAt),
  }

  const category = await prisma.categories.create({
    data: newCategory,
  })

  if (category) {
    return NextResponse.json(category.id, { status: 201 })
  }

  return NextResponse.json({}, { status: 400 })
}
