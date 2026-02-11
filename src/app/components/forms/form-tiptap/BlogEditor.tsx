"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";

import { Box, Button, Stack } from "@mui/material";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function BlogEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // اگر نمی‌خوای history داشته باشه (مثلاً برای فرم‌های ساده)
        // history: false,
      }),
      Image,
      // جدول کامل با قابلیت resize
      Table.configure({
        resizable: true,
      }),
      // این سه تا رو هم باید اضافه کنی (در v3 داخل همان پکیج table هستند)
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value || "<p>متن خود را اینجا بنویسید...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-lg focus:outline-none mx-auto",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <Box>
      {/* Toolbar ساده */}
      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        <Button
          variant={editor.isActive("bold") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          Bold
        </Button>

        <Button
          variant={editor.isActive("italic") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>

        <Button
          variant={editor.isActive("heading", { level: 2 }) ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </Button>

        <Button
          variant={editor.isActive("bulletList") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet
        </Button>

        <Button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setImage({ src: "https://picsum.photos/800/400" })
              .run()
          }
        >
          Image
        </Button>
      </Stack>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          minHeight: 300,
          "& .ProseMirror": {
            minHeight: "250px",
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}