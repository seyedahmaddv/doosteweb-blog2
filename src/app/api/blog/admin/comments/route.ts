import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status") || "pending";

    const res = await query(
      `SELECT c.*, p.title as post_title FROM comments c
       LEFT JOIN posts p ON c.post_id = p.id
       WHERE c.status = $1 ORDER BY c.created_at DESC`,
      [status]
    );

    return NextResponse.json({ status: 200, data: res.rows, msg: "success" });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}
