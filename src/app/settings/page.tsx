"use client";

import { useState } from "react";
import MenuBtn from "../components/MenuBtn";
import Header from "../components/Header";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Switch,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

export default function SettingsPage() {
  // 各設定の状態（ここではローカルstate。実際はcontextやredux、localStorage連携もあり）
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "terrain">("roadmap");
  const [zoomLevel, setZoomLevel] = useState<number>(15);
  const [clusterEnabled, setClusterEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [locationPermission, setLocationPermission] = useState<boolean>(true);

  return (
    <div>
      <Header title="設定" />

      <Box p={3} maxWidth={600} margin="auto" display="flex" flexDirection="column" gap={4}>
        {/* 地図タイプ */}
        <FormControl>
          <FormLabel>地図の種類</FormLabel>
          <RadioGroup
            row
            value={mapType}
            onChange={(e) => setMapType(e.target.value as typeof mapType)}
          >
            <FormControlLabel value="roadmap" control={<Radio />} label="標準" />
            <FormControlLabel value="satellite" control={<Radio />} label="衛星" />
            <FormControlLabel value="terrain" control={<Radio />} label="地形" />
          </RadioGroup>
        </FormControl>

        {/* ズームレベル */}
        <Box>
          <Typography gutterBottom>ズームレベル: {zoomLevel}</Typography>
          <Slider
            value={zoomLevel}
            onChange={(_, value) => setZoomLevel(value as number)}
            min={1}
            max={20}
            step={1}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* マーカークラスタリング */}
        <FormControlLabel
          control={
            <Switch
              checked={clusterEnabled}
              onChange={(e) => setClusterEnabled(e.target.checked)}
            />
          }
          label="マーカークラスタリングを有効にする"
        />

        {/* テーマ切替 */}
        <FormControl fullWidth>
          <InputLabel id="theme-select-label">テーマ</InputLabel>
          <Select
            labelId="theme-select-label"
            value={theme}
            label="テーマ"
            onChange={(e) => setTheme(e.target.value as typeof theme)}
          >
            <MenuItem value="light">ライト</MenuItem>
            <MenuItem value="dark">ダーク</MenuItem>
            <MenuItem value="system">システム設定に従う</MenuItem>
          </Select>
        </FormControl>

        {/* 位置情報利用許可 */}
        <FormControlLabel
          control={
            <Switch
              checked={locationPermission}
              onChange={(e) => setLocationPermission(e.target.checked)}
            />
          }
          label="位置情報の利用を許可する"
        />
      </Box>

      <MenuBtn />
    </div>
  );
}