"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useEditor, EditorContent, EditorContext } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from "@/components/tiptap-ui/color-highlight-popover"
import {
  LinkPopover,
  LinkButton,
  LinkContent,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button as MuiButton,
  Alert,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography as MuiTypography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"
import "@/components/tiptap-templates/simple/simple-editor.scss"

import content from "@/components/tiptap-templates/simple/data/content.json"
import { createPost } from "@/lib/api-client"

type BlogEditorProps = {
  onSaveSuccess?: (postId: number) => void
}

const DEFAULT_CATEGORIES = [
  { value: "Gadget", label: "گجت" },
  { value: "Lifestyle", label: "سبک زندگی" },
  { value: "Design", label: "طراحی" },
  { value: "Social", label: "اجتماعی" },
  { value: "Health", label: "سلامت" },
  { value: "Technology", label: "تکنولوژی" },
  { value: "Business", label: "تجارت" },
]

// Editor محتوا - تمام hooks در اینجا
function BlogEditorContent({ onSaveSuccess }: BlogEditorProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [newCategoryOpen, setNewCategoryOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [imagePreview, setImagePreview] = useState(false)
  const router = useRouter()
  const toolbarRef = useRef<HTMLDivElement>(null)

  // useEditor hook - همیشه فراخوانی می‌شود
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: { openOnClick: false, enableClickSelection: true },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content,
  })

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        value: newCategoryName.trim(),
        label: newCategoryName.trim(),
      }
      setCategories([...categories, newCategory])
      setCategory(newCategory.value)
      setNewCategoryName("")
      setNewCategoryOpen(false)
      setMessage({ type: "success", text: "دسته‌بندی جدید اضافه شد!" })
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      setMessage({ type: "error", text: "لطفاً یک عنوان وارد کنید" })
      return
    }

    if (!editor || editor.isEmpty) {
      setMessage({ type: "error", text: "لطفاً محتوا را وارد کنید" })
      return
    }

    if (!category) {
      setMessage({ type: "error", text: "لطفاً یک دسته‌بندی انتخاب کنید" })
      return
    }

    setSaving(true)
    try {
      const result = await createPost(
        {
          title,
          content: editor.getHTML(),
          cover_img: coverImage || "/images/blog/placeholder.jpg",
          category: category,
          tags: tags,
        },
        {
          name: "وب‌لاگ نویس",
          avatar: "/images/profile/user-1.jpg",
        }
      )

      if (result.status === 201 || result.status === 200) {
        setMessage({ type: "success", text: "پست با موفقیت ذخیره شد! ✅" })
        setTitle("")
        setCategory("")
        setCoverImage("")
        setTags([])
        setTagInput("")
        editor.commands.clearContent()
        setTimeout(() => setMessage(null), 3000)
        if (onSaveSuccess && result.data?.id) {
          onSaveSuccess(result.data.id)
        }
      } else {
        setMessage({ type: "error", text: `خطا: ${result.msg}` })
      }
    } catch (error) {
      setMessage({ type: "error", text: `خطا در ارسال: ${String(error)}` })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          {/* عنوان */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="عنوان پست"
              placeholder="عنوان پست را وارد کنید..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          {/* دسته‌بندی و تصویر کاور */}
          <Box sx={{ mb: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Box>
              <Select
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                size="small"
              >
                <MenuItem value="" disabled>
                  انتخاب دسته‌بندی...
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
              <MuiButton
                startIcon={<AddIcon />}
                size="small"
                sx={{ mt: 1 }}
                onClick={() => setNewCategoryOpen(true)}
              >
                دسته‌بندی جدید
              </MuiButton>
            </Box>

            <TextField
              fullWidth
              label="URL تصویر کاور"
              placeholder="https://..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          {/* پیش‌نمایش تصویر */}
          {coverImage && (
            <Box sx={{ mb: 2, cursor: "pointer" }} onClick={() => setImagePreview(!imagePreview)}>
              {imagePreview && (
                <Paper elevation={3} sx={{ p: 2 }}>
                  <img
                    src={coverImage}
                    alt="پیش‌نمایش تصویر کاور"
                    style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }}
                  />
                </Paper>
              )}
              <MuiButton size="small" onClick={() => setImagePreview(!imagePreview)}>
                {imagePreview ? "بستن پیش‌نمایش" : "نمایش پیش‌نمایش"}
              </MuiButton>
            </Box>
          )}

          {/* برچسب‌ها */}
          <Box sx={{ mb: 2 }}>
            <MuiTypography variant="subtitle2" sx={{ mb: 1 }}>
              برچسب‌ها
            </MuiTypography>
            <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder="برچسب جدید..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <MuiButton variant="outlined" size="small" onClick={handleAddTag}>
                اضافه کردن
              </MuiButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ویرایشگر محتوا */}
      <Card>
        <CardContent>
          <div className="simple-editor-wrapper" style={{ backgroundColor: "transparent" }}>
            <Toolbar
              ref={toolbarRef}
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(4px)",
                borderBottom: "1px solid #e0e0e0",
                padding: "8px",
              }}
            >
              <ToolbarGroup>
                <UndoRedoButton action="undo" />
                <UndoRedoButton action="redo" />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={false} />
                <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} portal={false} />
                <BlockquoteButton />
                <CodeBlockButton />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <MarkButton type="bold" />
                <MarkButton type="italic" />
                <MarkButton type="strike" />
                <MarkButton type="code" />
                <MarkButton type="underline" />
                <ColorHighlightPopover />
                <LinkPopover />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <MarkButton type="superscript" />
                <MarkButton type="subscript" />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <TextAlignButton align="left" />
                <TextAlignButton align="center" />
                <TextAlignButton align="right" />
                <TextAlignButton align="justify" />
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <ImageUploadButton text="افزودن تصویر" />
              </ToolbarGroup>
              <Spacer />
            </Toolbar>

            {editor && (
              <EditorContext.Provider value={{ editor }}>
                <EditorContent
                  editor={editor}
                  className="simple-editor-content"
                  style={{ minHeight: "400px", padding: "16px" }}
                />
              </EditorContext.Provider>
            )}
          </div>
        </CardContent>
      </Card>

      {/* پیام‌ها */}
      {message && (
        <Alert
          severity={message.type}
          sx={{ mt: 2 }}
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      {/* دکمه ذخیره */}
      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
        <MuiButton
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving}
          size="large"
        >
          {saving ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              در حال ذخیره...
            </>
          ) : (
            "ذخیره پست"
          )}
        </MuiButton>
      </Box>

      {/* دیالوگ افزودن دسته‌بندی جدید */}
      <Dialog open={newCategoryOpen} onClose={() => setNewCategoryOpen(false)}>
        <DialogTitle>اضافه کردن دسته‌بندی جدید</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="نام دسته‌بندی"
            fullWidth
            variant="standard"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddCategory()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setNewCategoryOpen(false)}>لغو</MuiButton>
          <MuiButton onClick={handleAddCategory} variant="contained">
            اضافه کردن
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

// Wrapper Component - فقط برای احراز هویت
export function BlogEditor({ onSaveSuccess }: BlogEditorProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // بررسی احراز هویت ادمین
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        })
        if (!res.ok) {
          setIsAdmin(false)
          router.push("/auth/auth1/login")
          return
        }
        const data = await res.json()
        if (data.data?.role !== "admin") {
          setIsAdmin(false)
          router.push("/")
          return
        }
        setIsAdmin(true)
      } catch (error) {
        console.error("Auth error:", error)
        setIsAdmin(false)
        router.push("/auth/auth1/login")
      } finally {
        setAuthLoading(false)
      }
    }
    checkAuth()
  }, [router])

  if (authLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isAdmin === false) {
    return null
  }

  return <BlogEditorContent onSaveSuccess={onSaveSuccess} />
}
