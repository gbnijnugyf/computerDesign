import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMyTable } from "./component/Mytable";

// export const BASEURL = "http://127.0.0.1:4523/m1/2947154-0-default";
// export const BASEURL_MOCK = "http://localhost:8080";
export const BASEURL = "http://localhost:8080";

// 返回响应中data的类型
export interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
}

interface IPostSpeechText{
  text:string
}


async function GlobalAxios<T = any, D = any>(
  method: "post",
  url: string,
  data: D
): Promise<AxiosResponse<IGlobalResponse<T>, any>> {


  let config: AxiosRequestConfig<D> = {};
  config.baseURL = BASEURL;

  const parsedURL = new URL(BASEURL + url);
  //   const parsedURL = parse(url);

  const params = new URLSearchParams(parsedURL.searchParams || "");
  //   url = parsedURL.pathname || "";
  config.params = params;
  let response;

  //axios将data自动序列化为json格式
  response = await axios[method]<IGlobalResponse<T>>(url, data, config)

  if (response.statusText === "OK") {
    return response;
  } else {
    alert(response.data.msg);
  }
  return response;
}

export const Service = {
  //获取表格
  getForm() {
    return GlobalAxios<IMyTable>("post", "/getformdata", null);
  },

  //上传表格-为了实现进度条，在Service外部实现
  postForm(props: FormData) {
    return GlobalAxios<string, FormData>("post", "/postformdata", props);
  },

  //发送语音文本信息
  postSpeechText(props: IPostSpeechText) {
    return GlobalAxios<string, IPostSpeechText>("post", "/postspeech", props);
  }
};


// axios({
//     url: "/formdata",
//     method: "post",
//     data: {},
//     responseType: "blob",
//   }).then((res) => {
//     // data就是接口返回的文件流
//     let data = res.data;
//     if (data) {
//       let attrs = res.headers["content-disposition"].split(";"); // 获取文件名
//       let fileName = "";
//       // 不用管fileName在第几个位置，只要=前面是fileName,就取=后面的值
//       for (let i = 0, l = attrs.length; i < l; i++) {
//         let temp = attrs[i].split("=");
//         if (temp.length > 1 && temp[0] === "fileName") {
//           fileName = temp[1];
//           break;
//         }
//       }
//       fileName = decodeURIComponent(fileName);

//       // 获取数据类型
//       let type = res.headers["content-type"].split(";")[0];
//       let blob = new Blob([res.data], { type: type });
//       const a = document.createElement("a");

//       // 创建URL
//       const blobUrl = window.URL.createObjectURL(blob);
//       a.download = fileName;
//       a.href = blobUrl;
//       document.body.appendChild(a);

//       // 下载文件
//       a.click();

//       // 释放内存
//       URL.revokeObjectURL(blobUrl);
//       document.body.removeChild(a);
//     } else {
//       console.log("error", data);
//     }
//   });
