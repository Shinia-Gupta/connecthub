"use client";

import Sidebar from "@/src/app/components/Sidebar";
import { useThemeStore } from "@/src/store/themeStore";
import { useUIStore } from "@/src/store/uiStore";
import { Box } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const { sidebarOpen } = useUIStore();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: theme === "dark" ? "#121212" : "#fafafa",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <Sidebar />
      <Box sx={{ flexGrow: 1, transition: "margin 0.3s", ml: sidebarOpen ? 25 : 8 }}>
        {/* <Box sx={{ p: 3 }}> */}
            {children}
        {/* </Box> */}
      </Box>
    </Box>
  );
}
