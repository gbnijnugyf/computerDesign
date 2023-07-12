import React, { useState } from 'react';
import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Modal, Progress, Tag, Upload, message } from 'antd';
import { BASEURL, IGlobalResponse, Service } from '../../service';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { IDisplayUploadHooks } from '../../props&interface/commonHook';


export interface IUpFileName {
    fileName: string;
    isFirst: boolean
}
export interface IUpFileHandle {
    fileName: IUpFileName;
    setFileName: React.Dispatch<React.SetStateAction<IUpFileName>>
}

export function UploadPage(handleHook: IDisplayUploadHooks) {
    const [progress, setProgress] = useState<number>(0);
    // const [upFileName, setUpFileName] = useState<IUpFileName>({ fileName: "", isFirst: true });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const acceptType = ["xlsx", "xls", "csv"];
    function isAcceptedType(type: string): boolean {
        let flag: boolean = false;
        acceptType.forEach((t) => {
            if ((t === type)) {
                flag = true;
            }
        })
        return flag;
    }
    function modalFooter() {
        return (
            <Button onClick={() => {
                setIsModalOpen(false);
            }}>
                我知道了
            </Button>
        )
    }
    function tagOnClose() {

        Service.deleteForm(handleHook.upFileHandle.fileName.fileName).then(() => {
            message.success("删除成功")
        }).catch(() => {
            message.error("删除失败")
        })
        handleHook.upFileHandle.setFileName({ fileName: "", isFirst: true });
        setProgress(0);
    }

    async function customRequest(data: any) {
        if (handleHook.upFileHandle.fileName.isFirst !== true) {
            setIsModalOpen(true);
            return;
        }
        console.log(data)
        const fileName: string = data.file.name;
        const fileNameSplit = fileName.split('.');
        const fileType = fileNameSplit[fileNameSplit.length - 1];
        if (isAcceptedType(fileType)) {
            const form = new FormData();
            form.append('file', data.file);
            console.log(form)

            let config: AxiosRequestConfig<FormData> = {};

            config.baseURL = BASEURL;
            const parsedURL = new URL(BASEURL + "/postformdata");
            const params = new URLSearchParams(parsedURL.searchParams || "");
            config.params = params;

            // config.headers = {
            //     "Content-Type":"application/x-www-form-urlencoded",
            //     "charset": "UTF-8"
            // }

            config.onUploadProgress = (progress: AxiosProgressEvent) => {
                if (progress.total) {
                    setProgress(Math.floor(progress.loaded / progress.total * 100));
                }
            }

            await axios["post"]<IGlobalResponse<string>>("/postformdata", form, config).then((res) => {
                console.log(res)
                handleHook.upFileHandle.setFileName({ fileName: fileName, isFirst: false })
                message.success(`${fileName} file uploaded successfully.`);
            }).catch(() => {
                message.error(`NetWork Error`);
            });

        } else {
            message.error(`file type error!`);
            return;
        }

    }

    const { Dragger } = Upload;

    const props: UploadProps = {
        name: 'file',
        multiple: false,
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
            {handleHook.upFileHandle.fileName.fileName === "" ? null : <Tag closable icon={<CheckCircleOutlined />} color="success" onClose={tagOnClose}>{handleHook.upFileHandle.fileName.fileName}</Tag>}
            <Modal title="提示" open={isModalOpen} footer={modalFooter()} >
                <p>您还有已上传的文件未删除哦，请删除后再上传新的文件</p>
            </Modal>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a <strong>single upload</strong>. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
                {progress > 0 ? <Progress percent={progress} /> : null}
            </Dragger>
        </>
    )
}