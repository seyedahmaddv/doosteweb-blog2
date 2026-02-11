import type { Post, Comment, Author } from "../types/blog";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";

export async function createPost(post: Post, author?: Author) {
  const res = await fetch(`${API_BASE}/blog/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post, author }),
  });
  return res.json();
}

export async function listPosts() {
  const res = await fetch(`${API_BASE}/blog/posts`);
  return res.json();
}

export async function getPost(postId: number | string) {
  const res = await fetch(`${API_BASE}/blog/posts/${postId}`);
  return res.json();
}

export async function createComment(postId: number | string, comment: Comment) {
  const res = await fetch(`${API_BASE}/blog/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  return res.json();
}

export async function listComments(postId: number | string) {
  const res = await fetch(`${API_BASE}/blog/posts/${postId}/comments`);
  return res.json();
}

export default { createPost, listPosts, getPost, createComment, listComments };
