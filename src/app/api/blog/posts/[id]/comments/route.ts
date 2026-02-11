import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { postId: string } }) {
  try {
    const postId = params.postId;
    const res = await query(
      `SELECT * FROM comments WHERE post_id = $1 AND status = 'approved' ORDER BY created_at DESC`,
      [postId]
    );
    return NextResponse.json({ status: 200, data: res.rows, msg: "success" });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  try {
    const postId = params.postId;
    const body = await req.json();
    const { profile_name, profile_email, profile_phone, content, parent_comment_id } = body;

    if (!profile_name || !profile_email || !content) {
      return NextResponse.json({ status: 400, msg: "نام، ایمیل و متن الزامی هستند" });
    }

    const res = await query(
      `INSERT INTO comments (post_id, profile_name, profile_email, profile_phone, content, status, parent_comment_id)
       VALUES($1,$2,$3,$4,$5,'pending',$6) RETURNING *`,
      [postId, profile_name, profile_email, profile_phone || null, content, parent_comment_id || null]
    );
    return NextResponse.json({ status: 201, data: res.rows[0], msg: "نظر شما با موفقیت ثبت شد. منتظر تایید است." });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}
