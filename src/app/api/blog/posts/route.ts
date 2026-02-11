import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import type { Post } from "../../../../types/blog";

export async function GET() {
  try {
    const res = await query(
      `SELECT p.*, a.id as author_id, a.name as author_name, a.avatar as author_avatar
       FROM posts p
       LEFT JOIN authors a ON p.author_id = a.id
       ORDER BY p.created_at DESC`);

    const rows = res.rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      content: r.content,
      cover_img: r.cover_img,
      created_at: r.created_at,
      views: r.views,
      shares: r.shares,
      category: r.category,
      featured: r.featured,
      tags: r.tags ? JSON.parse(r.tags) : [],
      author: r.author_id ? { id: r.author_id, name: r.author_name, avatar: r.author_avatar } : null,
    }));

    return NextResponse.json({ status: 200, data: rows, msg: "success" });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { post: Post; author?: { name: string; avatar?: string } };
    const { post, author } = body;

    // ensure author exists or create
    let authorId: number | null = null;
    if (author) {
      const a = await query("SELECT id FROM authors WHERE name = $1 LIMIT 1", [author.name]);
      if (a.rows.length) authorId = a.rows[0].id;
      else {
        const ins = await query("INSERT INTO authors(name, avatar) VALUES($1,$2) RETURNING id", [author.name, author.avatar || null]);
        authorId = ins.rows[0].id;
      }
    }

    const tagsJson = post.tags ? JSON.stringify(post.tags) : null;

    const insert = await query(
      `INSERT INTO posts(title, content, cover_img, category, featured, author_id, tags)
       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [post.title, post.content, post.cover_img || null, post.category || null, post.featured || false, authorId, tagsJson]
    );

    return NextResponse.json({ status: 201, data: insert.rows[0], msg: "created" });
  } catch (error) {
    return NextResponse.json({ status: 500, msg: "server error", error: String(error) });
  }
}
