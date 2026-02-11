import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this");

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { status: 401, msg: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    const verified = await jwtVerify(token, JWT_SECRET);
    const payload = verified.payload as any;

    return NextResponse.json({
      status: 200,
      data: {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        role: payload.role,
      },
      msg: "success",
    });
  } catch (error) {
    return NextResponse.json(
      { status: 401, msg: "Unauthorized - Invalid token", error: String(error) },
      { status: 401 }
    );
  }
}
