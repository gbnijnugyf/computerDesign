import {
  DiffOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export const LeftSider = [
  {
    
    key: "upload",
    icon: <UploadOutlined />,
    label: "表格上传",
  },
  {
    key: "display",
    icon: <SnippetsOutlined />,
    label: "表格展示",
  },
  {
    key: "data-handle",
    icon: <DiffOutlined />,
    label: "数据处理结果",
  },
  {
    key: "else",
    icon: <UnorderedListOutlined />,
    label: "其他",
  },
];
