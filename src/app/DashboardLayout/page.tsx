'use client'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import PageContainer from '@/app/components/container/PageContainer';
import CommentsManagement from '@/app/components/dashboards/modern/CommentsManagement';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/auth/auth1/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <Box sx={{ p: 3, textAlign: 'center' }}>درحال بارگیری...</Box>;
  }

  return (
    <PageContainer title="داشبورد" description="داشبورد - مدیریت نظرات">
      <Box mt={3}>
        <CommentsManagement />
      </Box>
    </PageContainer>
  );
}

