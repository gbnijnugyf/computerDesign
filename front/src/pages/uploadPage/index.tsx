import React, { useState } from 'react';
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

    async function customRequest(data: any) {
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
            
            // axios.defaults.baseURL = BASEURL

            // await axios<IGlobalResponse<string>>({
            //     method:"post",
            //     url:"/postformdata",
            //     data:form,
            //     headers: { "Content-Type": "multipart/form-data"},
            // }).then((res) => {
            //     console.log(res)
            //     message.success(`${fileName} file uploaded successfully.`);
            // }).catch(() => {
            //     message.error(`NetWork Error`);
            // });

            await axios["post"]<IGlobalResponse<string>>("/postformdata", form, config).then((res) => {
                console.log(res)
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
        onChange:(info)=>{
            console.log(info)
        },
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
            {progress > 0 ? <Progress percent={progress} /> : null}
        </Dragger>
    )
}