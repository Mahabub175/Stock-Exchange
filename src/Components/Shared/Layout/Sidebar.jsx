"use client";

import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import avatar from "@/assets/images/avatar.svg";
import Image from "next/image";

const items = [
  {
    label: "Home",
    key: "1",
  },
  {
    label: "Watch List",
    key: "2",
  },
  {
    label: "Portfolio",
    key: "3",
  },
  {
    label: "Discover",
    key: "4",
  },
];

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="flex items-center gap-5 justify-between text-white !bg-[#001529]  py-2 px-5">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXWd0UgLNee-CLkfC-N4m43L_r83WuZV9-tQ&s"
              alt="logo"
              className="w-full rounded-full h-6 object-cover"
            />
          </div>
        )}

        <Button
          type="text"
          className="!text-white"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <div className="!bg-[#001529] px-5 py-5 flex items-center gap-3">
        <Image src={avatar} alt="avatar" className="w-10 h-10" />
        {!collapsed && (
          <div className="flex flex-col gap-1">
            <p className="text-white text-xs">Have an account?</p>
            <p className="text-blue-500 text-xs">Sign in</p>
          </div>
        )}
      </div>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["4"]}
        items={items}
        className="!pt-5 sidebar-menu"
      />
      <Button
        className="!absolute bottom-10 w-full lg:w-5/6 left-0 lg:left-3"
        size="large"
        type="primary"
      >
        Sign Up
      </Button>
    </Sider>
  );
};

export default Sidebar;
