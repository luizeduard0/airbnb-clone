import bcrypt from "bcrypt";
import prisma from '@/app/libs/prismaDb'
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const { name, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}