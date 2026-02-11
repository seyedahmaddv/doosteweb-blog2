'use client';
import { Box, Container, Grid, Typography, Stack } from "@mui/material";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "MUI",
  "Context API",
  "REST API",
  "SEO",
  "Git & GitHub",
];

const Skills = () => {
  return (
    <Box pt={10}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" mb={5}>
          <Grid size={{ xs: 12, lg: 7 }} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              مهارت‌ها
            </Typography>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
        >
          {skills.map(skill => (
            <Box
              key={skill}
              px={3}
              py={1.2}
              borderRadius="20px"
              bgcolor="grey.100"
            >
              <Typography fontSize="14px">{skill}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Skills;
