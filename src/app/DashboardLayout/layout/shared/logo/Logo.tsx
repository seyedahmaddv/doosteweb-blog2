'use client'
import { CustomizerContext } from "@/app/context/customizerContext";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import config from '@/app/context/config'
import { useContext } from "react";
import { Typography, Box } from "@mui/material";

const Logo = () => {
  const { isCollapse, isSidebarHover, activeDir, activeMode } = useContext(CustomizerContext);

  const TopbarHeight = config.topbarHeight;

  const LinkStyled = styled(Link)(() => ({
    height: TopbarHeight,
    width: isCollapse == "mini-sidebar" && !isSidebarHover ? '40px' : '180px',
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  }));

  if (activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            color: activeMode === "dark" ? "#fff" : "#000",
            fontSize: "18px",
            whiteSpace: "nowrap",
          }}
        >
          سید احمد
        </Typography>
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          color: activeMode === "dark" ? "#fff" : "#000",
          fontSize: "18px",
          whiteSpace: "nowrap",
        }}
      >
        سید احمد
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
