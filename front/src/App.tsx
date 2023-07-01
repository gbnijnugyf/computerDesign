import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Speech } from "./Speech";
import { IMyTable, MyTable } from "./Mytable";
import { Service } from "./service";

const { Header, Sider, Content } = Layout;

const formInit:IMyTable = {
  formColumns:[
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
  ],
  formData:undefined
}

export function App() {
  const [form, setForm] = useState<IMyTable>(formInit);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const col = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "QQ号",
      dataIndex: "qq",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "所在城市",
      dataIndex: "city",
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const data = Array.from({ length: 100000 }, (_, key) => ({ key }));

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "表格展示",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "表格上传",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
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
            margin: "24px 16px",
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Layout>
            <Speech />
            <MyTable
              formColumns={form?.formColumns}
              formData={form?.formData}
            />
            <Button
              onClick={() => {
                setIsLoad(true);
                Service.getForm().then((res) => {
                  const formData: IMyTable = res.data.data;
                  formData.formColumns = col;
                  console.log(formData);
                  setIsLoad(false);
                  setForm(formData);
                });
              }}
              loading={isLoad}
            >
              获取表格信息
            </Button>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
