import { connectDBP } from "@/prisma/connectToDbPrisma";
import prisma from "@/prisma/connectToPrisma";
import createSecretToken from "@/utils/auth/createSecretToken";
import { serialize } from "cookie";
import bcrypt from 'bcryptjs'

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  try {
    await connectDBP();
    let { email, password, username, phone, imageUrl } = await req.json();
    console.log(email);
    password = await bcrypt.hash(password, 12)
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(existingUser); 

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        phone,
        imageUrl,
      },
      select: {
        id: true,
      },
    });
    console.log(user.id);
    const token = createSecretToken(user.id);
    console.log(token);

    const cookie = serialize("token", token, {
      path: "/",
      httpOnly: false, // Note: setting httpOnly to false for client-side access
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const response = NextResponse.json(
      { message: "User signed in successfully", success: true, user },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Database goes down", success: false },
      { status: 501 }
    );
  }
}
