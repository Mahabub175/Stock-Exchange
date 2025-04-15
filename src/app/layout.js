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
          <Layout className="h-screen relative">
            <Sidebar />

            <Layout className="relative">
              <div className="hidden lg:block sticky top-0 left-0 right-0 z-50 bg-white w-full">
                <TopNavigation />
              </div>

              <Content className="bg-white lg:pt-[6%]">{children}</Content>
            </Layout>
          </Layout>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
