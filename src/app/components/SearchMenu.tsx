"use client";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchMenu() {
  return (
    <div
      style={{
        position: "fixed",
        top: 50,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        zIndex: 10,
      }}
    >
      <form style={{ width: "100%" }} onSubmit={(e) => e.preventDefault()}>
        <TextField
          fullWidth
          placeholder="ここで検索"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px",
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              height: "45px", // ← 高さをここで指定
              paddingRight: "12px", // 余白
            },
            input: {
              padding: "0 0 0 0", // 不要なpaddingを消す（調整用）
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
}