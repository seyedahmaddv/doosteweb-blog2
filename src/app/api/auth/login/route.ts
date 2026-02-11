import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "admin123";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      // ایجاد JWT token
      const token = await new SignJWT({
        id: 1,
        username: ADMIN_USER,
        email: "admin@example.com",
        role: "admin",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(JWT_SECRET);

      const response = NextResponse.json({
        status: 200,
        token,
        user: {
          id: 1,
          username: ADMIN_USER,
          email: "admin@example.com",
          role: "admin",
        },
        msg: "با موفقیت وارد شدید",
      });

      // تنظیم cookie برای token
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    } else {
      return NextResponse.json(
        { status: 401, msg: "نام کاربری یا رمز عبور نادرست" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: 500, msg: "server error", error: String(error) },
      { status: 500 }
    );
  }
}
