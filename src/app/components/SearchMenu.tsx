"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  onSearch: (input: string) => void;
};

export default function SearchMenu({ onSearch }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

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
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          placeholder="自販機または飲み物を検索"
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
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
