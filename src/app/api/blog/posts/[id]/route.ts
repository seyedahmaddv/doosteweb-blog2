import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    // حذف پست
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING id",
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { status: 404, msg: "پست یافت نشد", data: null },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { status: 200, msg: "پست با موفقیت حذف شد", data: { id } },
      { status: 200 }
    )
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      {
        status: 500,
        msg: "خطا در حذف پست",
        error: String(error),
      },
      { status: 500 }
    )
  }
}
