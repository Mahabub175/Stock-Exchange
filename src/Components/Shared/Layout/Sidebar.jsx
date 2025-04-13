"use client";

import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

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
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="!relative"
    >
      <div className="flex items-center gap-5 justify-between text-white !bg-[#eff6ff1a]  py-2 px-5">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXWd0UgLNee-CLkfC-N4m43L_r83WuZV9-tQ&s"
              alt="logo"
              className="w-full rounded-full h-8 object-cover"
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
      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
        className="!pt-5 sidebar-menu"
      />
      <Button
        className="!absolute bottom-10 w-5/6 left-3"
        size="large"
        type="primary"
      >
        Sign Up
      </Button>
    </Sider>
  );
};

export default Sidebar;
