import { Button, Layout, message } from "antd";
import { IMyTable, MyTable } from "../../component/Mytable";
import { useState } from "react";
import { Service } from "../../service";
import { Speech } from "../../component/Speech";
import { IDisplayUploadHooks } from "../../props&interface/commonHook";


export function DisplayPage(handleHook: IDisplayUploadHooks) {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  function getFormBtn() {
    setIsLoad(true);
    if (handleHook.upFileHandle.fileName.fileName === "") {
      message.error("请先上传文件");
      setIsLoad(false);
      return;
    }
    Service.getForm(handleHook.upFileHandle.fileName.fileName).then((res) => {
      console.log(res.data.data)
      const formData: IMyTable = {
        formCol: res.data.data.formCol,
        formData: res.data.data.formData
      };
      // // formData.formColumns = col;
      console.log(formData);
      setIsLoad(false);
      handleHook.displayHandle.setForm(formData);
    });
  }

  return (
    <Layout>
      <Speech />
      <MyTable formCol={handleHook.displayHandle.form?.formCol} formData={handleHook.displayHandle.form?.formData} />
      <Button
        onClick={getFormBtn}
        loading={isLoad}
      >
        获取{handleHook.upFileHandle.fileName.fileName}的表格信息
      </Button>
    </Layout>
  );
}
