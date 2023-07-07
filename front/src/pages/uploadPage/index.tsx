import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload, message } from 'antd';
import { Service } from '../../service';

export function UploadPage() {

    const acceptType = ["xlsx", "xls", "csv"];
    function isAcceptedType(type: string): boolean {
        console.log(type);
        let flag: boolean = false;
        acceptType.forEach((t) => {
            if ((t === type)) {
                flag = true;
            }
        })
        return flag;
    }

    async function customRequest(props: any) {
        console.log(props);
        const fileName: string = props.file.name;
        const fileNameSplit = fileName.split('.');
        const fileType = fileNameSplit[fileNameSplit.length - 1];
        if (isAcceptedType(fileType)) {
            console.log("type right")

            const form = new FormData();
            form.append('file', props.file);
            // form 对象 就是我们上传接口需要的参数 
            // 调用api接口进行请求 , uploadFile 是走我们封装的 请求的 , 请求头 token 都包含
            const res = await Service.postForm(form);
            console.log((res))

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
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // onChange(info) {
        //     const { status } = info.file;
        //     console.log(info)
        //     if (status !== 'uploading') {
        //         console.log(info.file, info.fileList);
        //     }
        //     if (status === 'done') {
        //         message.success(`${info.file.name} file uploaded successfully.`);
        //     } else if (status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`);
        //     }
        // },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
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
        </Dragger>
    )
}