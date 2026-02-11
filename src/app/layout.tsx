import React from "react";
import MyApp from "./app";
import NextTopLoader from 'nextjs-toploader';
import "./global.css";
import { CustomizerContextProvider } from "./context/customizerContext";


export const metadata = {
  title: "وبلاگ سیداحمد",
  description: "توسعه دهنده ری اکت و نکست جی اس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body>
        <NextTopLoader color="#5D87FF" />
        <CustomizerContextProvider>
          <MyApp>{children}</MyApp>
        </CustomizerContextProvider>
      </body>
    </html>
  );
}


// صفحه لی اوت جدید
// "use client";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { styled, useTheme } from "@mui/material/styles";
// import React, { useContext } from "react";
// import Header from "./layout/vertical/header/Header";
// import Sidebar from "./layout/vertical/sidebar/Sidebar";
// import Customizer from "./layout/shared/customizer/Customizer";
// import Navigation from "./layout/horizontal/navbar/Navigation";
// import HorizontalHeader from "./layout/horizontal/header/Header";
// import { CustomizerContext } from "@/app/context/customizerContext";
// import config from "@/app/context/config";

// const MainWrapper = styled("div")(() => ({
//   display: "flex",
//   minHeight: "100vh",
//   width: "100%",
// }));

// const PageWrapper = styled("div")(() => ({
//   display: "flex",
//   flexGrow: 1,
//   paddingBottom: "60px",
//   flexDirection: "column",
//   zIndex: 1,
//   width: "100%",
//   backgroundColor: "transparent",
// }));

// interface Props {
//   children: React.ReactNode;
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const { activeLayout, isLayout, activeMode, isCollapse } = useContext(CustomizerContext);
//   const theme = useTheme();
//   const MiniSidebarWidth = config.miniSidebarWidth;
//   return (
//     <MainWrapper className={activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
//       <title>Modernize NextJs</title>
//       {/* ------------------------------------------- */}
//       {/* Sidebar */}
//       {/* ------------------------------------------- */}
//       {activeLayout === 'horizontal' ? "" : <Sidebar />}
//       {/* ------------------------------------------- */}
//       {/* Main Wrapper */}
//       {/* ------------------------------------------- */}
//       <PageWrapper
//         className="page-wrapper"
//         sx={{
//           ...(isCollapse === "mini-sidebar" && {
//             [theme.breakpoints.up("lg")]: {
//               ml: `87px`,
//             },
//           }),
//         }}
//       >
//         {/* ------------------------------------------- */}
//         {/* Header */}
//         {/* ------------------------------------------- */}
//         {activeLayout === 'horizontal' ? <HorizontalHeader /> : <Header />}
//         {/* PageContent */}
//         {activeLayout === 'horizontal' ? <Navigation /> : ""}
//         <Container
//           sx={{
//             pt: '30px',
//             maxWidth: isLayout === "boxed" ? "lg" : "100%!important",
//           }}
//         >
//           {/* ------------------------------------------- */}
//           {/* PageContent */}
//           {/* ------------------------------------------- */}

//           <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
//             {/* <Outlet /> */}
//             {children}
//             {/* <Index /> */}
//           </Box>

//           {/* ------------------------------------------- */}
//           {/* End Page */}
//           {/* ------------------------------------------- */}
//         </Container>
//         <Customizer />
//       </PageWrapper>
//     </MainWrapper>
//   );
// }

//سومین حالت
// "use client";

// import React, { useContext } from "react";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { styled, useTheme } from "@mui/material/styles";
// import NextTopLoader from "nextjs-toploader";

// import MyApp from "./app";
// import "./global.css";

// import Header from "./layout/vertical/header/Header";
// import Sidebar from "./layout/vertical/sidebar/Sidebar";
// import { CustomizerContextProvider } from "./context/customizerContext";
// import { CustomizerContext } from "./context/customizerContext";

// const MainWrapper = styled("div")(() => ({
//   display: "flex",
//   minHeight: "100vh",
//   width: "100%",
// }));

// const PageWrapper = styled("div")(() => ({
//   display: "flex",
//   flexGrow: 1,
//   flexDirection: "column",
//   width: "100%",
// }));

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { activeMode, isCollapse } = useContext(CustomizerContext);
//   const theme = useTheme();

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <NextTopLoader color="#5D87FF" />

//         <CustomizerContextProvider>
//           <MyApp>
//             <MainWrapper className={activeMode === "dark" ? "darkbg" : ""}>
//               <Sidebar />

//               <PageWrapper
//                 sx={{
//                   ...(isCollapse === "mini-sidebar" && {
//                     [theme.breakpoints.up("lg")]: {
//                       ml: "87px",
//                     },
//                   }),
//                 }}
//               >
//                 <Header />

//                 <Container sx={{ pt: 3 }}>
//                   <Box sx={{ minHeight: "calc(100vh - 120px)" }}>
//                     {children}
//                   </Box>
//                 </Container>
//               </PageWrapper>
//             </MainWrapper>
//           </MyApp>
//         </CustomizerContextProvider>
//       </body>
//     </html>
//   );
// }


//چهارمین حالت
// "use client"
// import React from "react";
// import MyApp from "./app";
// import NextTopLoader from 'nextjs-toploader';
// import "./global.css";
// import { CustomizerContextProvider } from "./context/customizerContext";

// import Header from "./layout/horizontal/header/Header";
// import Navigation from "./layout/horizontal/navbar/Navigation";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { styled } from "@mui/material/styles";

// const MainWrapper = styled("div")(() => ({
//   display: "flex",
//     flexDirection: "column", // 👈 کلیدی
//   minHeight: "100vh",
//   width: "100%",
// }));

// const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
//   return (
    
//       <MainWrapper>
//         <Header />
//         <Navigation />

//         <Container sx={{ mt: 4 }}>
//           <Box>{children}</Box>
//         </Container>
//       </MainWrapper>
    
//   );
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <NextTopLoader color="#5D87FF" />

//         <CustomizerContextProvider>
//           <MyApp>
//             <LayoutWrapper>{children}</LayoutWrapper>
//           </MyApp>
//         </CustomizerContextProvider>
//       </body>
//     </html>
//   );
// }

