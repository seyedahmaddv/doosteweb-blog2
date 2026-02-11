import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const [totalComments, pendingComments, approvedComments, totalPosts] = await Promise.all([
      query(`SELECT COUNT(*) as count FROM comments`),
      query(`SELECT COUNT(*) as count FROM comments WHERE status = 'pending'`),
      query(`SELECT COUNT(*) as count FROM comments WHERE status = 'approved'`),
      query(`SELECT COUNT(*) as count FROM posts`),
    ]);

    return NextResponse.json({
      status: 200,
      data: {
        total_comments: totalComments.rows[0].count,
        pending_comments: pendingComments.rows[0].count,
        approved_comments: approvedComments.rows[0].count,
        total_posts: totalPosts.rows[0].count,
      },
      msg: "success",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}
