'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Grid,
} from '@mui/material'

type Comment = {
  id: number
  post_id: number
  post_title?: string
  profile_name: string
  profile_email: string
  profile_phone?: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function CommentsManagement() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editValues, setEditValues] = useState<{ profile_name?: string; profile_email?: string; profile_phone?: string; content?: string }>({})
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 })

  useEffect(() => {
    fetchComments()
    fetchStats()
  }, [filter])

  const fetchStats = async () => {
    try {
      const result = await fetch('/api/blog/admin/stats')
      const data = await result.json()
      if (data.status === 200) {
        setStats({
          total: data.data.total_comments,
          pending: data.data.pending_comments,
          approved: data.data.approved_comments,
          rejected: data.data.total_comments - data.data.approved_comments - data.data.pending_comments,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchComments = async () => {
    try {
      setLoading(true)
      const result = await fetch(`/api/blog/admin/comments?status=${filter}`)
      const data = await result.json()
      if (data.status === 200) {
        setComments(data.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    const result = await fetch(`/api/blog/admin/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' }),
    })
    if (result.ok) {
      fetchComments()
      fetchStats()
    }
  }

  const handleReject = async (id: number) => {
    const result = await fetch(`/api/blog/admin/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }),
    })
    if (result.ok) {
      fetchComments()
      fetchStats()
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      const result = await fetch(`/api/blog/admin/comments/${id}`, {
        method: 'DELETE',
      })
      if (result.ok) {
        fetchComments()
        fetchStats()
      }
    }
  }

  const openEdit = (c: Comment) => {
    setSelectedComment(c)
    setEditValues({ profile_name: c.profile_name, profile_email: c.profile_email, profile_phone: c.profile_phone, content: c.content })
    setEditDialogOpen(true)
  }

  const handleEditSave = async () => {
    if (!selectedComment) return
    const payload: any = {
      profile_name: editValues.profile_name,
      profile_email: editValues.profile_email,
      profile_phone: editValues.profile_phone,
      content: editValues.content,
    }
    const res = await fetch(`/api/blog/admin/comments/${selectedComment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setEditDialogOpen(false)
      setSelectedComment(null)
      fetchComments()
      fetchStats()
    } else {
      alert('خطا در ذخیره تغییرات')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success'
      case 'rejected':
        return 'error'
      default:
        return 'warning'
    }
  }

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid  size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: '28px', fontWeight: 'bold', color: '#1976d2' }}>
                  {stats.total}
                </Box>
                <Box sx={{ fontSize: '12px', color: '#666' }}>کل نظرات</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
                  {stats.pending}
                </Box>
                <Box sx={{ fontSize: '12px', color: '#666' }}>منتظر تایید</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:1, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: '28px', fontWeight: 'bold', color: '#4caf50' }}>
                  {stats.approved}
                </Box>
                <Box sx={{ fontSize: '12px', color: '#666' }}>تایید شده</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: '28px', fontWeight: 'bold', color: '#f44336' }}>
                  {stats.rejected}
                </Box>
                <Box sx={{ fontSize: '12px', color: '#666' }}>رد شده</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant={filter === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setFilter('pending')}
          sx={{ mr: 1 }}
        >
          منتظر تایید
        </Button>
        <Button
          variant={filter === 'approved' ? 'contained' : 'outlined'}
          onClick={() => setFilter('approved')}
          sx={{ mr: 1 }}
        >
          تایید شده
        </Button>
        <Button
          variant={filter === 'rejected' ? 'contained' : 'outlined'}
          onClick={() => setFilter('rejected')}
        >
          رد شده
        </Button>
      </Box>

      {/* Comments Table */}
      <Card>
        <CardHeader title="مدیریت نظرات" />
        <CardContent>
          {loading ? (
            <Box sx={{ textAlign: 'center', p: 3 }}>در حال بارگیری...</Box>
          ) : comments.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 3, color: '#999' }}>نظری یافت نشد.</Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>نویسنده</TableCell>
                    <TableCell>ایمیل</TableCell>
                    <TableCell>پست</TableCell>
                    <TableCell>متن</TableCell>
                    <TableCell>وضعیت</TableCell>
                    <TableCell>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>{comment.profile_name}</TableCell>
                      <TableCell sx={{ fontSize: '12px' }}>{comment.profile_email}</TableCell>
                      <TableCell sx={{ fontSize: '12px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {comment.post_title}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {comment.content}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            comment.status === 'pending'
                              ? 'منتظر'
                              : comment.status === 'approved'
                                ? 'تایید'
                                : 'رد'
                          }
                          color={getStatusColor(comment.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px' }}>
                        {comment.status === 'pending' && (
                          <>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => handleApprove(comment.id)}
                              sx={{ mr: 1 }}
                            >
                              تایید
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              onClick={() => handleReject(comment.id)}
                            >
                              رد
                            </Button>
                          </>
                        )}
                        <Button
                          size="small"
                          variant="outlined"
                          color="inherit"
                          onClick={() => handleDelete(comment.id)}
                          sx={{ mt: 1 }}
                        >
                          حذف
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => openEdit(comment)}
                          sx={{ mt: 1, ml: 1 }}
                        >
                          ویرایش
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={() => { setEditDialogOpen(false); setSelectedComment(null) }} fullWidth maxWidth="sm">
          <DialogTitle>ویرایش نظر</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="نام"
              fullWidth
              value={editValues.profile_name || ''}
              onChange={(e) => setEditValues({ ...editValues, profile_name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="ایمیل"
              fullWidth
              value={editValues.profile_email || ''}
              onChange={(e) => setEditValues({ ...editValues, profile_email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="تلفن"
              fullWidth
              value={editValues.profile_phone || ''}
              onChange={(e) => setEditValues({ ...editValues, profile_phone: e.target.value })}
            />
            <TextField
              margin="dense"
              label="متن نظر"
              fullWidth
              multiline
              minRows={4}
              value={editValues.content || ''}
              onChange={(e) => setEditValues({ ...editValues, content: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setEditDialogOpen(false); setSelectedComment(null) }}>انصراف</Button>
            <Button variant="contained" onClick={handleEditSave}>ذخیره</Button>
          </DialogActions>
        </Dialog>
    </Box>
  )
}
