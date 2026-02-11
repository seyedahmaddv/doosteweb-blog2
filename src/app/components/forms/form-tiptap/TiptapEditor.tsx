"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Button, Stack } from "@mui/material";

const TiptapEditor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: "<p>Type here...</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <Box>
      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        <Button
          variant={editor.isActive("heading", { level: 1 }) ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </Button>
        <Button
          variant={editor.isActive("heading", { level: 2 }) ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </Button>
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
          variant={editor.isActive("strike") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          Strike
        </Button>
        <Button
          variant={editor.isActive("bulletList") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet list
        </Button>
        <Button
          variant={editor.isActive("orderedList") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered list
        </Button>
        <Button
          variant={editor.isActive("blockquote") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Blockquote
        </Button>
        <Button
          variant={editor.isActive("codeBlock") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code block
        </Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</Button>
        <Button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          Undo
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          Redo
        </Button>
        <Button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
          Clear
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
            outline: "none",
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default TiptapEditor;
