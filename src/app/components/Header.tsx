"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1976d2",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
