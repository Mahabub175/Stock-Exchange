"use client";

import { Layout } from "antd";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/Components/Shared/Layout/Sidebar";
import TopNavigation from "@/Components/Shared/Layout/TopNavigation";
import MainProvider from "@/Provider/MainProvider";

const { Content } = Layout;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>
          <Layout className="h-screen">
            <Sidebar />

            <Layout className="overflow-hidden">
              <TopNavigation />

              <Content className="bg-white pt-[12%]">{children}</Content>
            </Layout>
          </Layout>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
