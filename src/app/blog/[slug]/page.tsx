
import BlankCard from "@/app/components/shared/BlankCard";
import markdownToHtml from "@/utils/markdownToHtml";
import { CardContent, Container, Divider } from "@mui/material";
import { format } from "date-fns";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons-react';
import PageContainer from '@/app/components/container/PageContainer';
import C2a from '@/app/components/frontend-pages/shared/c2a';
import Footer from '@/app/components/frontend-pages/shared/footer';
import ScrollToTop from '@/app/components/frontend-pages/shared/scroll-to-top';
import HeaderAlert from "@/app/components/frontend-pages/shared/header/HeaderAlert";
import HpHeader from "@/app/components/frontend-pages/shared/header/HpHeader";
import Banner from "@/app/components/frontend-pages/blog/banner";
import { query } from "@/lib/db";

export async function generateMetadata({ params }: any) {
    try {
        const res = await query(
            `SELECT p.*, a.id as author_id, a.name as author_name, a.avatar as author_avatar
             FROM posts p
             LEFT JOIN authors a ON p.author_id = a.id
             WHERE p.id = $1`,
            [params.slug]
        );
        
        const post = res.rows[0];
        const siteName = process.env.SITE_NAME || "Your Site Name";
        const authorName = process.env.AUTHOR_NAME || "Your Author Name";

        if (post) {
            const metadata = {
                title: `${post.title || "Single Post Page"} | ${siteName}`,
                author: authorName,
                robots: {
                    index: true,
                    follow: true,
                    nocache: true,
                    googleBot: {
                        index: true,
                        follow: false,
                        "max-video-preview": -1,
                        "max-image-preview": "large",
                        "max-snippet": -1,
                    },
                },
            };

            return metadata;
        } else {
            return {
                title: "Not Found",
                description: "No blog article has been found",
                author: authorName,
                robots: {
                    index: false,
                    follow: false,
                    nocache: false,
                    googleBot: {
                        index: false,
                        follow: false,
                        "max-video-preview": -1,
                        "max-image-preview": "large",
                        "max-snippet": -1,
                    },
                },
            };
        }
    } catch (error) {
        return {
            title: "Error",
            description: "An error occurred",
        };
    }
}

export default async function Post({ params }: any) {
    try {
        const res = await query(
            `SELECT p.*, a.id as author_id, a.name as author_name, a.avatar as author_avatar
             FROM posts p
             LEFT JOIN authors a ON p.author_id = a.id
             WHERE p.id = $1`,
            [params.slug]
        );
        
        const post = res.rows[0];

        if (!post) {
            return (
                <PageContainer title="Not Found" description="Post not found">
                    <Container maxWidth="lg" sx={{ my: 4, textAlign: 'center' }}>
                        <Typography variant="h3">پست مورد نظر یافت نشد</Typography>
                    </Container>
                </PageContainer>
            );
        }

        // سعی بر پردازش محتوا به عنوان Markdown، در صورت شکست از محتوای اصلی استفاده کن
        let content = post.content || "";
        
        try {
            // اگر محتوا شامل markdown syntax است
            if (content.includes('#') || content.includes('**') || content.includes('[')) {
                content = await markdownToHtml(content);
            }
            // در غیر این صورت، محتوا را به عنوان متن ساده یا HTML استفاده کن
        } catch (error) {
            console.error('Error converting markdown:', error);
            // اگر خطا رخ داد، از محتوای اصلی استفاده کن
        }

        return (
            <>
                <PageContainer title="پست وبلاگ" description="جزئیات پست وبلاگ">

                    {/* <HeaderAlert /> */}
                    <HpHeader />
                    {/* <Banner /> */}
                    <Container maxWidth="lg" sx={{
                        my: 4
                    }}>
                        <BlankCard>
                            <>
                                <CardMedia component="img" height="440" image={post.cover_img} alt="Blog cover" />
                                <CardContent>
                                    <Stack direction="row" sx={{ marginTop: '-45px' }}>
                                        <Tooltip title={post.author_name || ''} placement="top">
                                            <Avatar aria-label="recipe" src={post.author_avatar}></Avatar>
                                        </Tooltip>
                                        <Chip
                                            sx={{
                                                marginLeft: 'auto',
                                                marginTop: '-21px',
                                                backgroundColor: 'white',
                                            }}
                                            label="2 min Read"
                                            size="small"
                                        ></Chip>
                                    </Stack>
                                    <Chip label={post.category || 'عام'} size="small" sx={{ marginTop: 2 }}></Chip>
                                    <Box my={3}>
                                        <Typography
                                            gutterBottom
                                            variant="h1"
                                            fontWeight={600}
                                            color="inherit"
                                            sx={{ textDecoration: 'none' }}
                                        >
                                            {post.title}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" gap={3} alignItems="center">
                                        <Stack direction="row" gap={1} alignItems="center">
                                            <IconEye size="18" /> {post.views || 0}
                                        </Stack>
                                        <Stack direction="row" gap={1} alignItems="center">
                                            <IconMessage2 size="18" /> {post.shares || 0}
                                        </Stack>

                                        <Stack direction="row" ml="auto" alignItems="center">
                                            <IconPoint size="16" />
                                            <small>{post ? <>{format(new Date(post.created_at), "dd MMM yyyy")}</> : ''}</small>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                                <Divider />
                                <CardContent>
                                    {content.includes('<') ? (
                                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                                    ) : (
                                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                                            {content}
                                        </Typography>
                                    )}
                                </CardContent>
                            </>

                        </BlankCard>
                    </Container>
                    <C2a />
                    <Footer />
                    <ScrollToTop />
                </PageContainer>


            </>
        );
    } catch (error) {
        return (
            <PageContainer title="Error" description="An error occurred">
                <Container maxWidth="lg" sx={{ my: 4, textAlign: 'center' }}>
                    <Typography variant="h3">خطایی رخ داد</Typography>
                </Container>
            </PageContainer>
        );
    }
}