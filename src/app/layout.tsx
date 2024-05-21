import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AntdConfig from "./AntdConfig";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Лабораторные работы по SQL",
  description: "Лабораторные работы по SQL",
  authors: [{ name: "Алексей Вохмин", url: "https://github.com/gosvoh" }],
  creator: "Алексей Вохмин",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={[inter.className, "p-4"].join(" ")}>
        <AntdRegistry>
          <AntdConfig>
            <App>{children}</App>
          </AntdConfig>
        </AntdRegistry>
      </body>
    </html>
  );
}
