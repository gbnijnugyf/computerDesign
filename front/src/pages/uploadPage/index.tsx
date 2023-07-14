import React, { useState } from 'react';
import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import type { CollapseProps, UploadProps } from 'antd';
import { Button, Collapse, Modal, Progress, Tag, Upload, message, Image } from 'antd';
import { BASEURL, IGlobalResponse, Service } from '../../service';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { IDisplayUploadHooks } from '../../props&interface/commonHook';
import './index.css'

export interface IUpFileName {
    fileName: string;
    fileType: string;
    isFirst: boolean
}
export interface IUpFileHandle {
    fileName: IUpFileName;
    setFileName: React.Dispatch<React.SetStateAction<IUpFileName>>
}

export function UploadPage(handleHook: IDisplayUploadHooks) {
    const [progress, setProgress] = useState<number>(0);
    // const [upFileName, setUpFileName] = useState<IUpFileName>({ fileName: "", isFirst: true });
    const [isModalOpen1, setIsModalOpen1] = useState<boolean>(false);
    const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
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
    function modalFooter(no: number) {
        return (
            <Button onClick={() => {
                switch (no) {
                    case 1:
                        setIsModalOpen1(false);
                        break;
                    case 2:
                        setIsModalOpen2(false);
                        break;
                    default:
                        break;
                }
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
        handleHook.upFileHandle.setFileName({ fileName: "", fileType: "", isFirst: true });
        setProgress(0);
    }


    async function customRequest(data: any) {
        if (handleHook.upFileHandle.fileName.isFirst !== true) {
            setIsModalOpen1(true);
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

            config.onUploadProgress = (progress: AxiosProgressEvent) => {
                if (progress.total) {
                    setProgress(Math.floor(progress.loaded / progress.total * 100));
                }
            }

            await axios["post"]<IGlobalResponse<string>>("/postformdata", form, config).then((res) => {
                console.log(res)
                handleHook.upFileHandle.setFileName({ fileName: fileName, fileType: fileType, isFirst: false })
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
        // style:{minHeight:"50vh"},

    };

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: '表格格式',
            children:
                <div className='img-form'></div>
            // <img src="../../static/formMode.png" alt='格式' />
        },
    ]

    return (
        <>
            {handleHook.upFileHandle.fileName.fileName === "" ? null : <Tag closable icon={<CheckCircleOutlined />} color="success" onClose={tagOnClose}>{handleHook.upFileHandle.fileName.fileName}</Tag>}
            <Modal title="提示" open={isModalOpen1} footer={modalFooter(1)} >
                <p>您还有已上传的文件未删除哦，请删除后再上传新的文件</p>
            </Modal>
            {/* <Modal centered={true} width={"70vw"} title="表格格式" open={isModalOpen2} footer={modalFooter(2)}>
                <Image src="../../static/formMode.png" alt='格式' />
                <div className='img-form'></div>

            </Modal>
            <Button onClick={() => setIsModalOpen2(true)}>点击查看上传表格格式</Button> */}

            <div >
                <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此上传</p>
                    <p className="ant-upload-hint">
                        支持 <strong>单个文件</strong>上传.
                    </p>
                    {progress > 0 ? <Progress percent={progress} /> : null}
                </Dragger>
            </div>
            <Collapse items={items} defaultActiveKey={['1']} />

        </>
    )
}