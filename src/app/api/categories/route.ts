import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.categories.findMany()

  if (categories) {
    return NextResponse.json(categories, { status: 200 })
  }

  return NextResponse.json({}, { status: 404 })
}
