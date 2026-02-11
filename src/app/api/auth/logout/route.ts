import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    status: 200,
    msg: "با موفقیت خارج شدید",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
