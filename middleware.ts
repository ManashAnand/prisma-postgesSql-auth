import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma/connectToPrisma";

import { jwtVerify } from "jose";
interface CustomJwtPayload extends JwtPayload {
  id: number;
}

function isCustomJwtPayload(
  payload: string | JwtPayload
): payload is CustomJwtPayload {
  return (payload as CustomJwtPayload).id !== undefined;
}
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;
  if (!token) {
    return NextResponse.json({ success: false,msg:"Token not found" });
  }
  try {
    // const decoded = jwt.verify(token, );

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_KEY);
    const { payload } = await jwtVerify(token, secret);

    console.log(payload);
    if (!isCustomJwtPayload(payload)) {
      throw new Error("Invalid token payload");
    }
    // const user = await prisma.user.findUnique({
    //   where: { id: payload.id },
    // });
    if (payload) {
      const response = NextResponse.next();
      response.headers.set('Payload', JSON.stringify(payload));
      return response;
    } else {
      return NextResponse.json({ success: false,msg:"Payload was not correct" });
    }
  } catch (err:any) {
    // console.log(err);
    return NextResponse.json({ success: false,msg:err?.message ?? "Error in token" });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: '/about/:path*',
  matcher: "/api/auth/:path*",
};
