import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { status: 400, msg: "تمام فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    // برای اکنون فقط یک پیام موفقیت بازگردانید
    // در عملی باید کاربر را در DB ذخیره کنید
    return NextResponse.json({
      status: 201,
      msg: "ثبت نام موفق",
      user: { name, email },
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, msg: "server error", error: String(error) },
      { status: 500 }
    );
  }
}
