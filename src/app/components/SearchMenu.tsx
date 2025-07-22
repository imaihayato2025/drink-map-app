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
          placeholder="自販機または飲み物を検索"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // ← 少し薄くした
              height: "45px",
              paddingRight: "12px",
              "& fieldset": {
                border: "none",
              },
            },
            input: {
              padding: 0,
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