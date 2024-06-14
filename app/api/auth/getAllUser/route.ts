import { connectDBP } from "@/prisma/connectToDbPrisma";
import prisma from "@/prisma/connectToPrisma";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    await connectDBP();
    const payloadHeader = req.headers.get('Payload');
    if (!payloadHeader) {
      return NextResponse.json({ status: false, message: 'Missing payload' }, { status: 401 });
    }
  
    const payload = JSON.parse(payloadHeader);
  
    // You can now use the payload in your main function
    console.log('Payload:', payload);
    const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });
    return NextResponse.json(
      { msg: "Everything working fine", success: true,user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Database goes down", success: false },
      { status: 501 }
    );
  }
}
