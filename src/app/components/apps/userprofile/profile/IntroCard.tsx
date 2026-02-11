'use client'
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ChildCard from "../../../../components/shared/ChildCard";
import {
  IconBriefcase,
  IconDeviceDesktop,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";

const IntroCard = () => (
  <ChildCard>
    <Typography fontWeight={600} variant="h4" mb={2}>
      معرفی
    </Typography>
    <Typography color="textSecondary" variant="subtitle2" mb={2}>
      سلام، من سید احمد هستم. دوست دارم وب‌سایت و گرافیک را طراحی کنم. معتقدم که فناوری می‌تواند جهان را بهتر کند و دوست دارم بخشی از این تغییر باشم.
    </Typography>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconBriefcase size="21" />
      <Typography variant="h6">توسعه‌دهنده وب و طراح</Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconMail size="21" />
      <Typography variant="h6">seyedahmadqz@gmail.com</Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconDeviceDesktop size="21" />
      <Typography variant="h6">www.seyedahmad.dev</Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={1}>
      <IconMapPin size="21" />
      <Typography variant="h6">ایران</Typography>
    </Stack>
  </ChildCard>
);

export default IntroCard;
