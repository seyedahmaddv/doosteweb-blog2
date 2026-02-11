"use client";
import React from "react";
import { Box, Stack, Typography, Container, Grid, Button } from "@mui/material";
import Link from "next/link";

const Banner = () => {
  return (
    <Box
      bgcolor="primary.light"
      sx={{
        paddingTop: {
          xs: "40px",
          lg: "100px",
        },
        paddingBottom: {
          xs: "40px",
          lg: "100px",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid
            alignItems="center"
            size={{
              xs: 12,
              lg: 6
            }}>
            <Typography
              variant="h1"
              mb={3}
              lineHeight={1.4}
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "34px",
                  sm: "48px",
                },
              }}
            >
              درباره من - سیداحمد
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/contact"
              >
                شروع پروژه
              </Button>
              <Button variant="outlined" size="large">
                مشاوره رایگان
              </Button>
            </Stack>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            size={{
              xs: 12,
              lg: 5
            }}>
            <Typography lineHeight={1.9}>
              من سیداحمد هستم، توسعه‌دهنده فرانت‌اند متخصص در React و Next.js. چند سال به‌صورت حرفه‌ای روی طراحی و توسعه وب‌اپلیکیشن‌های مدرن، سریع و مقیاس‌پذیر کار می‌کنم. مأموریت من کمک به کسب‌وکارها و استارتاپ‌ها تا ایده‌هایشان را به محصول واقعی تبدیل کنند. من بر کد تمیز، تصمیم‌های فنی هوشمند و نتایج واقعی تاکید دارم.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
