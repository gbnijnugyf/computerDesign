import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { LeftSider } from "../../menuProps";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;


export function MainPage() {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const data = Array.from({ length: 100000 }, (_, key) => ({ key }));

  const navigate = useNavigate();

  return (
    <Layout style={{height:"100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["upload"]}
          onClick={(props) =>
            props.key.length !== 0 ? navigate(props.key) : null
          }
          items={LeftSider}
        />
      </Sider>
      <Layout style={{height:"100vh"}}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "5vh 2vw",
            padding: "3vw",
            minHeight: "60vh",
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
