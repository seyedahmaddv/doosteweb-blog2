"use client"

import PageContainer from '@/app/components/container/PageContainer'
import { Box, Tabs, Tab, Typography, Card, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress, Chip, Grid } from "@mui/material"
import { useState, useEffect } from "react"
import { BlogEditor } from "@/components/blog-editor"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface Post {
  id: number
  title: string
  content: string
  cover_img?: string
  category?: string
  tags?: string[]
  created_at?: string
  views?: number
  author?: {
    name: string
    avatar?: string
  }
}

export default function BlogManagementPage() {
  const [tabValue, setTabValue] = useState(0)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // دریافت تمام پست‌ها
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/blog/posts")
        const data = await res.json()
        if (data.data) {
          setPosts(data.data)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
        setMessage({ type: "error", text: "خطا در دریافت پست‌ها" })
      } finally {
        setLoading(false)
      }
    }

    if (tabValue === 0) {
      fetchPosts()
    }
  }, [tabValue])

  const handleDeleteClick = (post: Post) => {
    setSelectedPost(post)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedPost) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/blog/posts/${selectedPost.id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== selectedPost.id))
        setMessage({ type: "success", text: "پست با موفقیت حذف شد" })
        setDeleteDialogOpen(false)
        setSelectedPost(null)
      } else {
        setMessage({ type: "error", text: "خطا در حذف پست" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "خطا در ارسال درخواست" })
    } finally {
      setDeleting(false)
    }
  }

  const handleSaveSuccess = () => {
    setTabValue(0) // برو به تب لیست پست‌ها
    // دوباره دریافت پست‌ها
    const fetchPosts = async () => {
      const res = await fetch("/api/blog/posts")
      const data = await res.json()
      if (data.data) {
        setPosts(data.data)
      }
    }
    fetchPosts()
  }

  return (
    <PageContainer title="مدیریت وبلاگ" description="نوشتن و مدیریت پست‌های وبلاگ">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          مدیریت وبلاگ
        </Typography>

        {message && (
          <Alert
            severity={message.type}
            sx={{ mb: 2 }}
            onClose={() => setMessage(null)}
          >
            {message.text}
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="📋 لیست پست‌ها" />
            <Tab label="✏️ نوشتن پست جدید" />
          </Tabs>
        </Box>

        {/* تب 1: لیست پست‌ها */}
        {tabValue === 0 && (
          <Box>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress />
              </Box>
            ) : posts.length === 0 ? (
              <Alert severity="info">
                هنوز پستی نوشته نشده است. برو به تب "نوشتن پست جدید"
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {posts.map((post) => (
                  <Grid item xs={12} md={6} lg={4} key={post.id}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      {post.cover_img && (
                        <Box
                          component="img"
                          src={post.cover_img}
                          alt={post.title}
                          sx={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                          {post.title}
                        </Typography>

                        {post.category && (
                          <Chip
                            label={post.category}
                            size="small"
                            sx={{ mb: 1, mr: 1 }}
                          />
                        )}

                        {post.tags && post.tags.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            {post.tags.slice(0, 2).map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                            {post.tags.length > 2 && (
                              <Typography variant="caption" display="block">
                                +{post.tags.length - 2} برچسب دیگر
                              </Typography>
                            )}
                          </Box>
                        )}

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.secondary", fontSize: 12 }}>
                          {post.views !== undefined && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <VisibilityIcon sx={{ fontSize: 16 }} />
                              {post.views}
                            </Box>
                          )}
                          {post.created_at && (
                            <Typography variant="caption">
                              {new Date(post.created_at).toLocaleDateString('fa-IR')}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>

                      <CardActions>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          disabled
                          title="قریباً..."
                        >
                          ویرایش
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteClick(post)}
                        >
                          حذف
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* تب 2: نوشتن پست جدید */}
        {tabValue === 1 && (
          <Box>
            <BlogEditor onSaveSuccess={handleSaveSuccess} />
          </Box>
        )}
      </Box>

      {/* دیالوگ تأیید حذف */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>تأیید حذف</DialogTitle>
        <DialogContent>
          آیا مطمئن هستی که می‌خواهی این پست را حذف کنی؟
          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
            "{selectedPost?.title}"
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>لغو</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "در حال حذف..." : "حذف"}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  )
}
