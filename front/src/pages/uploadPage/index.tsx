import React, {useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Progress, Upload, message } from 'antd';
import { BASEURL, IGlobalResponse } from '../../service';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';

export function UploadPage() {
    const [progress, setProgress] = useState<number>(0);
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

    async function customRequest(props: any) {
        const fileName: string = props.file.name;
        const fileNameSplit = fileName.split('.');
        const fileType = fileNameSplit[fileNameSplit.length - 1];
        if (isAcceptedType(fileType)) {
            const form = new FormData();
            form.append('file', props.file);
            // form 对象 就是我们上传接口需要的参数 
            // 调用api接口进行请求 , uploadFile 是走我们封装的 请求的 , 请求头 token 都包含
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
            await axios["post"]<IGlobalResponse<string>>("/postformdata", props, config).then((res) => {
                message.success(`${fileName} file uploaded successfully.`);
            }).catch(() => {
                message.error(`NetWork Error`);
            });

        } else {
            message.error(`file type error!`)
            return
        }

    }

    const { Dragger } = Upload;

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,

        customRequest: customRequest,
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a <strong>single upload</strong>. Strictly prohibited from uploading company data or other
                banned files.
            </p>
            <Progress percent={progress} />
        </Dragger>
    )
}