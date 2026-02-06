import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { arrayToString } from '@/lib/json-helpers'
import { Prisma } from '@prisma/client'

const registerSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  interests: z.array(z.string()).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username },
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        interests: arrayToString(validatedData.interests || []),
      },
    })

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    // Handle unique constraint errors (email/username)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'User with this email or username already exists' },
          { status: 400 }
        )
      }
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        // In development, include message to help debug
        detail:
          process.env.NODE_ENV !== 'production' && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 }
    )
  }
}
