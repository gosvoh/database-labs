"use client";

import { ConfigProvider, theme } from "antd";
import React from "react";
import ruRU from "antd/locale/ru_RU";

export default function AntdConfig({ children }: React.PropsWithChildren) {
  return (
    <ConfigProvider locale={ruRU} theme={{ algorithm: theme.darkAlgorithm }}>
      {children}
    </ConfigProvider>
  );
}
