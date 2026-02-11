"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const footerLinks = [
  {
    id: 1,
    children: [
      {
        title: true,
        titleText: 'Services',
        translationKey: 'خدمات',
      },
      {
        title: false,
        titleText: 'Next.js Website Design',
        // translationKey: 'nextjsDesign',
        translationKey: 'توسعه و طراحی با نکست',
        link: '#',
      },
      {
        title: false,
        titleText: 'React Frontend Development',
        // translationKey: 'reactDevelopment',
        translationKey: 'توسعه با ری اکت',

        link: '#',
      },
      {
        title: false,
        titleText: 'Admin Dashboard Development',
        // translationKey: 'adminDashboard',
        translationKey: 'توسعه داشبورد مدیریت',

        link: '#',
      },
      {
        title: false,
        titleText: 'SEO Friendly Web Apps',
        // translationKey: 'seoWebApps',
        translationKey: 'وب اپلیکیشنهای سئو محور',

        link: '#',
      },
      {
        title: false,
        titleText: 'Consulting & Code Review',
        // translationKey: 'consulting',
        translationKey: 'مشاوره',

        link: 'https://survey.porsline.ir/s/jcmf4FfI',

      },
    ],
  },
  {
    id: 2,
    children: [
      {
        title: true,
        titleText: 'About',
        translationKey: 'درباره',
      },
      {
        title: false,
        titleText: 'About Me',
        translationKey: 'درباره من',
        link: '/about',
      },
      {
        title: false,
        titleText: 'My Skills',
        translationKey: 'مهارتها',
        link: '/skills',
      },
      {
        title: false,
        titleText: 'Projects & Portfolio',
        translationKey: 'نمونه کارها',
        link: '/portfolio',
      },
      {
        title: false,
        titleText: 'Blog',
        translationKey: 'وبلاگ',
        link: '/blog',
      },
    ],
  },
  {
    id: 3,
    children: [
      {
        title: true,
        titleText: 'Contact',
        translationKey: 'تماس',
      },
      // {
      //   title: false,
      //   titleText: 'Contact Me',
      //   translationKey: 'تماس با من',
      //   link: '/contact',
      // },
      {
        title: false,
        titleText: 'Phone: 0904260454',
        translationKey: 'تلفن',
        link: 'tel:0904260454',
      },
      {
        title: false,
        titleText: 'LinkedIn',
        translationKey: 'لینکدین',
        link: 'https://linkedin.com/in/seyedahmaddv',
      },
      {
        title: false,
        titleText: 'GitHub',
        translationKey: 'گیت هاب',
        link: 'https://github.com/seyedahmaddv',
      },
      {
        title: false,
        titleText: 'Eitaa Channel',
        translationKey: 'ایتا',
        link: 'https://eitaa.com/seyedahmaddev',
      },
    ],
  },
];
const isExternal = (link?: string) =>
  link?.startsWith("http") || link?.startsWith("tel:");

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          pt: {
            xs: "30px",
            lg: "60px",
          },
        }}
      >
        <Grid container spacing={3} justifyContent="space-between" mb={7}>
          {footerLinks.map((footerlink, i) => (
            <Grid
              key={i}
              size={{
                xs: 6,
                sm: 4,
                lg: 2
              }}>
              {footerlink.children.map((child, i) => (
                <React.Fragment key={i}>
                  {child.title ? (
                    <Typography fontSize="17px" fontWeight="600" mb="22px">
                      {child.translationKey ? t(child.translationKey) : child.titleText}
                    </Typography>
                  ) : child.link ? (
                    <Link
                      href={child.link}
                      target={isExternal(child.link) ? "_blank" : undefined}
                      rel={isExternal(child.link) ? "noopener noreferrer" : undefined}
                    >
                      <Typography
                        sx={{
                          display: "block",
                          padding: "10px 0",
                          fontSize: "15px",
                          color: (theme) => theme.palette.text.primary,
                          "&:hover": {
                            color: (theme) => theme.palette.primary.main,
                          },
                        }}
                        component="span"
                      >
                        {child.translationKey ? t(child.translationKey) : child.titleText}
                      </Typography>
                    </Link>
                  ) : null}

                </React.Fragment>
              ))}
            </Grid>
          ))}
          <Grid
            size={{
              xs: 6,
              sm: 6,
              lg: 2
            }}>
            <Typography fontSize="17px" fontWeight="600" mb="22px">
              مرا دنبال کنید
            </Typography>

            <Stack direction="row" gap="20px">
              <Tooltip title="ویراستی">
                <Link href="https://virasty.com/Seyedahmaddev">
                  <Image
                    src="/images/frontend-pages/icons/icon-facebook.svg"
                    alt="facebook"
                    width={22}
                    height={22}
                  />
                </Link>
              </Tooltip>
              <Tooltip title="کانال سیداحمد">
                <Link href="https://eitaa.com/seyedahmaddev">
                  <Image
                    src="/images/frontend-pages/icons/icon-twitter.svg"
                    alt="twitter"
                    width={22}
                    height={22}
                  />
                </Link>
              </Tooltip>
              {/* <Tooltip title="Instagram">
                <Link href="#">
                  <Image
                    src="/images/frontend-pages/icons/icon-instagram.svg"
                    alt="instagram"
                    width={22}
                    height={22}
                  />
                </Link>
              </Tooltip> */}
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        <Box
          py="40px"
          flexWrap="wrap"
          display="flex"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={1} alignItems="center">
            {/* <Image
              src="/images/logos/logoIcon.svg"
              width={20}
              height={20}
              alt="logo"
            /> */}
            <Typography variant="body1" fontSize="15px">
              همه حقوق محفوظ است.{" "}
            </Typography>
          </Stack>
          <Typography variant="body1" fontSize="15px">
            توسعه توسط{" "}
            <Typography component={Link} color="primary.main" href="https://linkedin.com/in/seyedahmaddv/">
              سیداحمد
            </Typography>
            .
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Footer;
