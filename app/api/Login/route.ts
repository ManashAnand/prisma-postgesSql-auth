import { connectDBP } from "@/prisma/connectToDbPrisma";
import prisma from "@/prisma/connectToPrisma";
import createSecretToken from "@/utils/auth/createSecretToken";
import { serialize } from "cookie";
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  try {
    await connectDBP();
    const { email, password,  } = await req.json();
    if(!email || !password ){
        return NextResponse.json({message:"All fields are required",success:false},{status:400})
      }
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

    const auth = await bcrypt.compare(password,existingUser.password)

    if (!auth) {
        return NextResponse.json({message:"Incorrect password or email" ,success:false},{status:400}) 
      }
 
      const token = createSecretToken(existingUser.id);
    console.log(token);

    const cookie = serialize("token", token, {
      path: "/",
      httpOnly: false, // Note: setting httpOnly to false for client-side access
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const response = NextResponse.json(
      { message: "User signed in successfully", success: true, user:existingUser },
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
