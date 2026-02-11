

"use client";
import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RTL from "@/app/DashboardLayout/layout/shared/customizer/RTL";
import { ThemeSettings } from "@/utils/theme/Theme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "@/utils/i18n";
import i18n from "@/utils/i18n";
import { I18nextProvider } from "react-i18next";
import { CustomizerContext } from '@/app/context/customizerContext';


const MyApp = ({ children }: { children: React.ReactNode }) => {
    const theme = ThemeSettings();
    const { activeDir } = useContext(CustomizerContext);

    return (
        <>
            <I18nextProvider i18n={i18n}>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider theme={theme}>
                        <RTL direction={activeDir}>
                            <CssBaseline />
                            {children}
                        </RTL>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </I18nextProvider>
        </>
    );
};

export default MyApp;
