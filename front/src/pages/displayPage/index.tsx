import { Button, Layout } from "antd";
import { Speech } from "../../Speech";
import { IMyTable, MyTable } from "../../Mytable";
import { useState } from "react";
import { Service } from "../../service";

const formInit: IMyTable = {
  formColumns: [
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
    { title: "", dataIndex: "key" },
  ],
  formData: undefined,
};
export function DisplayPage() {
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

  return (
    <Layout>
      <Speech />
      <MyTable formColumns={form?.formColumns} formData={form?.formData} />
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
  );
}
