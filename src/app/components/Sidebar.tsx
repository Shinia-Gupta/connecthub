"use client";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MessageSquare, ChevronLeft, ChevronRight, Blocks } from "lucide-react";
import { useUIStore } from "@/src/store/uiStore";
import Link from "next/link";

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <Box
      sx={{
        width: sidebarOpen ? 200 : 60,
        bgcolor: "#1e1e1e",
        color: "#fff",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: sidebarOpen ? "flex-start" : "center",
        transition: "width 0.3s",
      }}
    >
      <IconButton onClick={toggleSidebar} sx={{ color: "#fff", mb: 2 }}>
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      <Tooltip title="Dashboard" placement="right">
        <Link href="/dashboard">
          <IconButton sx={{ color: "#fff" }}>
            <Blocks /> 
          </IconButton>
            {sidebarOpen && <span>Dashboard</span>}
        </Link>
      </Tooltip>

      <Tooltip title="Chat" placement="right">
        <Link href="/chat">
          <IconButton sx={{ color: "#fff" }}>
            <MessageSquare /> 
          </IconButton>
            {sidebarOpen && <span>Chat</span>}
        </Link>
      </Tooltip>
    </Box>
  );
}
