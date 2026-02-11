'use client';
import React from 'react';
import Grid from '@mui/material/Grid';
import PageContainer from '@/app/components/container/PageContainer';
import {
  Card,
  CardContent,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box,
} from '@mui/material';
import { IconShield, IconUser } from '@tabler/icons-react';

const ROLES = [
  {
    id: 'user',
    name: 'کاربر',
    description: 'کاربران عادی می‌توانند پست‌ها را مشاهده کنند',
    color: 'primary',
    permissions: [
      'مشاهده پست‌های منتشر شده',
      'نظر دادن بر روی پست‌ها',
      'مشاهده پروفایل',
    ],
  },
  {
    id: 'admin',
    name: 'مدیر',
    description: 'مدیران می‌توانند تمام سیستم را کنترل کنند',
    color: 'error',
    permissions: [
      'ایجاد و ویرایش پست‌ها',
      'تایید نظرات',
      'مدیریت کاربران',
      'مدیریت سیستم',
      'دسترسی کامل',
    ],
  },
];

export default function UserRolesPage() {
  return (
    <PageContainer title="نقش‌های کاربران" description="نقش‌ها و دسترسی‌های کاربران">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          نقش‌ها و دسترسی‌ها
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          در زیر نقش‌های موجود در سیستم و دسترسی‌های مرتبط با هر نقش نشان داده شده‌است.
        </Alert>

        <Grid container spacing={3}>
          {ROLES.map((role) => (
            <Grid size={{xs:12, md:6}} key={role.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {role.id === 'admin' ? (
                      <IconShield size={32} style={{ marginLeft: 12, color: '#d32f2f' }} />
                    ) : (
                      <IconUser size={32} style={{ marginLeft: 12, color: '#1976d2' }} />
                    )}
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {role.name}
                      </Typography>
                      <Chip
                        label={role.id}
                        size="small"
                        color={role.color as any}
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {role.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    دسترسی‌ها:
                  </Typography>

                  <List dense>
                    {role.permissions.map((permission, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemText
                          primary={`✓ ${permission}`}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ mt: 4, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              نکات مهم
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="نقش‌های پیش‌فرض"
                  secondary="سیستم دارای دو نقش اصلی: کاربر عادی و مدیر است"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="تغییر نقش"
                  secondary="می‌توانید نقش کاربران را از طریق بخش مدیریت کاربران تغییر دهید"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="حقوق مدیر"
                  secondary="مدیران دسترسی کامل به تمام ویژگی‌های سیستم دارند و می‌توانند دیگر مدیران را ایجاد کنند"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="امنیت"
                  secondary="تنها مدیران می‌توانند نقش‌ها را تغییر دهند"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
}
