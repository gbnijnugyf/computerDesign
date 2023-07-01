import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export const LeftSider = [
  {
    key: "display",
    icon: <UserOutlined />,
    label: "表格展示",
  },
  {
    key: "upload",
    icon: <VideoCameraOutlined />,
    label: "表格上传",
  },
  {
    key: "else",
    icon: <UploadOutlined />,
    label: "其他",
  },
];
