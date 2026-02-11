'use client';
import React, { useEffect, useState } from 'react';
import BlogCard from '../blog-card/BlogCard';
import { Container, Grid, CircularProgress, Alert, Typography } from '@mui/material';
import { listPosts } from '@/lib/api-client';

type Blog = {
  id?: number;
  title?: string;
  slug?: string;
  content?: string;
  cover_img?: string;
  coverImage?: string;
  excerpt?: string;
  created_at: string;
  date: string;
  author: string;
  authorImage: string;
  comments: string;
  views: string;
  category: string;
};

const BlogList = () => {
    const [posts, setPosts] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setError(null);
                const response = await listPosts();
                if (response.data && Array.isArray(response.data)) {
                    const transformedPosts = response.data.map((post: any) => {
                        // استخراج خلاصه از محتوا (200 کاراکتر اول)
                        const excerpt = post.content 
                            ? post.content.substring(0, 200) + '...' 
                            : 'بدون خلاصه';
                        
                        return {
                            id: post.id,
                            title: post.title,
                            slug: post.id.toString(),
                            content: post.content,
                            cover_img: post.cover_img,
                            coverImage: post.cover_img,
                            excerpt: excerpt,
                            created_at: post.created_at,
                            date: post.created_at,
                            author: post.author?.name || 'نویسنده نامشخص',
                            authorImage: post.author?.avatar || '/images/profile/user-1.jpg',
                            views: post.views || 0,
                            comments: post.shares || 0,
                            category: post.category || 'عام'
                        };
                    });
                    setPosts(transformedPosts);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('خطا در بارگیری پست‌ها');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 8, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (posts.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                    هیچ پستی برای نمایش وجود ندارد
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{
            mt: 4, mb: 8
        }}>
            <Grid container spacing={3}>
                {posts.map((blog, i) => (
                    <Grid
                        display="flex"
                        alignItems="stretch"
                        key={i}
                        size={{
                            xs: 12,
                            lg: 4,
                            md: 4,
                            sm: 6
                        }}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
}

export default BlogList;
