import { Button, Layout, message } from "antd";
import { IMyTable, MyTable } from "../../component/Mytable";
import { useState } from "react";
import { Service } from "../../service";
import { Speech } from "../../component/Speech";
// import { IUpFileHandle } from "../uploadPage";

const formInit: IMyTable = {
  formCol: [
    { title: "", dataIndex: "key" },
  ],
  formData: undefined,
};
export function DisplayPage() {
  const [form, setForm] = useState<IMyTable>(formInit);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  let fileName = ""

  function getFormBtn(){
    setIsLoad(true);
    if (fileName === "") {
      message.error("请先上传文件");
      setIsLoad(false);
      return;
    }
    Service.getForm(fileName).then((res) => {
      console.log(res.data.data)
      const formData: IMyTable = {
        formCol: res.data.data.formCol,
        formData: res.data.data.formData
      };
      // // formData.formColumns = col;
      console.log(formData);
      setIsLoad(false);
      setForm(formData);
    });
  }

  return (
    <Layout>
      <Speech />
      <MyTable formCol={form?.formCol} formData={form?.formData} />
      <Button
        onClick={getFormBtn}
        loading={isLoad}
      >
        获取表格信息
      </Button>
    </Layout>
  );
}
