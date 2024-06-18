import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const formData = await request.json()

  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const safeBody = bodySchema.safeParse(formData)
  if (!safeBody.success) {
    console.error(safeBody.error)
    throw new Error()
  }

  const userAlreadyExists = await prisma.users.findUnique({
    where: {
      email: safeBody.data.email,
    },
  })

  if (userAlreadyExists) {
    return NextResponse.json({}, { status: 403 })
  }

  const hashPassword = await bcrypt.hash(safeBody.data.password, 10)

  const newUser = {
    name: safeBody.data.name,
    email: safeBody.data.email,
    password: hashPassword,
  }

  const user = await prisma.users.create({
    data: newUser,
  })

  if (user) {
    return NextResponse.json(user.id, { status: 201 })
  }

  return NextResponse.json({}, { status: 400 })
}
