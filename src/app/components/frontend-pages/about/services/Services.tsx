'use client';
import { Box, Container, Grid, Typography } from "@mui/material";

const services = [
  "طراحی و توسعه وب‌سایت با Next.js (سئو محور)",
  "توسعه رابط کاربری با React و TypeScript",
  "پیاده‌سازی داشبوردهای مدیریتی",
  "بهینه‌سازی سرعت و عملکرد وب‌اپلیکیشن‌ها",
  "مشاوره فنی و Code Review",
  "همکاری بلندمدت به‌عنوان Frontend Developer",
];

const Services = () => {
  return (
    <Box pt={10}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" mb={5}>
          <Grid size={{ xs: 12, lg: 7 }} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              خدمات من
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center">
          {services.map((service, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Box
                border="1px solid"
                borderColor="grey.200"
                borderRadius="16px"
                p={3}
                textAlign="center"
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: 'primary.main',
                  }
                }}
              >
                <Typography fontSize="16px">
                  {service}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
