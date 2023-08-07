import React, { useState } from "react";
import { CheckCircleOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Progress, Tag, Upload, message } from "antd";
import { BASEURL, IGlobalResponse, Service } from "../../service";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";

export interface IUpFileName {
  fileName: string;
  fileType: string;
  // isFirst: boolean
}
export interface IUpFileHandle {
  fileArr: IUpFileName[];
  setFileArr: React.Dispatch<React.SetStateAction<IUpFileName[]>>;
}

export function UploadPage(upFileHandle: IUpFileHandle) {
  const [progress, setProgress] = useState<number>(0);
  // const [upFileName, setUpFileName] = useState<IUpFileName>({ fileName: "", isFirst: true });
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const acceptType = ["jpg", "png", "jpeg"];
  function isAcceptedType(type: string): boolean {
    let flag: boolean = false;
    acceptType.forEach((t) => {
      if (t === type) {
        flag = true;
      }
    });
    return flag;
  }
  // function modalFooter() {
  //     return (
  //         <Button onClick={() => {
  //             setIsModalOpen(false);
  //         }}>
  //             我知道了
  //         </Button>
  //     )
  // }
  //   function tagOnClose() {
  //     Service.deleteForm(upFileHandle.fileName.fileName)
  //       .then(() => {
  //         message.success("删除成功");
  //       })
  //       .catch(() => {
  //         message.error("删除失败");
  //       });
  //     upFileHandle.setFileName({ fileName: "", fileType: "" });
  //     setProgress(0);
  //   }

  async function customRequest(data: any) {
    // if (upFileHandle.fileName.isFirst !== true) {
    //     setIsModalOpen(true);
    //     return;
    // }
    console.log(data);
    const fileName: string = data.file.name;
    const fileNameSplit = fileName.split(".");
    const fileType = fileNameSplit[fileNameSplit.length - 1];
    if (isAcceptedType(fileType)) {
      const form = new FormData();
      form.append("file", data.file);
      console.log(form);

      let config: AxiosRequestConfig<FormData> = {};

      config.baseURL = BASEURL;
      const parsedURL = new URL(BASEURL + "/postformdata");
      const params = new URLSearchParams(parsedURL.searchParams || "");
      config.params = params;

      config.onUploadProgress = (progress: AxiosProgressEvent) => {
        if (progress.total) {
          setProgress(Math.floor((progress.loaded / progress.total) * 100));
        }
      };

      await axios["post"]<IGlobalResponse<string>>(
        "/postformdata",
        form,
        config
      )
        .then((res) => {
          console.log(res);
          let tempArr: IUpFileName[] = upFileHandle.fileArr;
          tempArr.push({ fileName: fileName, fileType: fileType });
          upFileHandle.setFileArr(tempArr);
          message.success(`${fileName} file uploaded successfully.`);
        })
        .catch(() => {
          message.error(`NetWork Error`);
        });
    } else {
      message.error(`file type error!`);
      return;
    }
  }

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    onChange: () => {
      // if (upFileName !== "") {
      //     setIsModalOpen(true);
      // }
    },
    customRequest: customRequest,
    // beforeUpload(file, FileList) {
    //     console.log(file.name)
    //     setUpFileName(file.name)
    // },
  };

  return (
    <>
      {upFileHandle.fileArr.length === 1
        ? null
        : upFileHandle.fileArr.map((item) => {
            if (item.fileName === "") {
              return <></>;
            } else {
              return (
                <Tag
                  closable
                  icon={<CheckCircleOutlined />}
                  color="success"
                  // onClose={tagOnClose}
                >
                  {item.fileName}
                </Tag>
              );
            }
          })}
      {/* <Modal title="提示" open={isModalOpen} footer={modalFooter()} >
                <p>您还有已上传的文件未删除哦，请删除后再上传新的文件</p>
            </Modal> */}
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a <strong>single upload</strong>. Strictly prohibited from
          uploading company data or other banned files.
        </p>
        {progress > 0 ? <Progress percent={progress} /> : null}
      </Dragger>
    </>
  );
}
