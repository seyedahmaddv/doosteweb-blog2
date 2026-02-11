import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { commentId: string } }) {
  try {
    const commentId = params.commentId;
    const body = await req.json();
    // Accept either { status } to update status, or { content, profile_name, profile_email, profile_phone } to edit comment
    const { status, content, profile_name, profile_email, profile_phone } = body;

    if (status && !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ status: 400, msg: "invalid status" });
    }

    let res;
    if (content || profile_name || profile_email || profile_phone) {
      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;
      if (profile_name !== undefined) {
        fields.push(`profile_name = $${idx++}`);
        values.push(profile_name);
      }
      if (profile_email !== undefined) {
        fields.push(`profile_email = $${idx++}`);
        values.push(profile_email);
      }
      if (profile_phone !== undefined) {
        fields.push(`profile_phone = $${idx++}`);
        values.push(profile_phone);
      }
      if (content !== undefined) {
        fields.push(`content = $${idx++}`);
        values.push(content);
      }
      // If status was also provided, include it
      if (status !== undefined) {
        fields.push(`status = $${idx++}`);
        values.push(status);
      }

      if (!fields.length) {
        return NextResponse.json({ status: 400, msg: "no fields to update" });
      }

      values.push(commentId);
      const q = `UPDATE comments SET ${fields.join(",")} WHERE id = $${idx} RETURNING *`;
      res = await query(q, values);
    } else if (status) {
      res = await query(`UPDATE comments SET status = $1 WHERE id = $2 RETURNING *`, [status, commentId]);
    } else {
      return NextResponse.json({ status: 400, msg: "no update payload provided" });
    }

    if (!res.rows.length) {
      return NextResponse.json({ status: 404, msg: "comment not found" });
    }

    return NextResponse.json({ status: 200, data: res.rows[0], msg: "updated" });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}

export async function DELETE(req: Request, { params }: { params: { commentId: string } }) {
  try {
    const commentId = params.commentId;
    await query(`DELETE FROM comments WHERE id = $1`, [commentId]);
    return NextResponse.json({ status: 200, msg: "deleted" });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}
