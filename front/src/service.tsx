import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMyTable } from "./component/Mytable";

const BASEURL = "http://127.0.0.1:4523/m1/2947154-0-default";

// 返回响应中data的类型
interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
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

//   console.log(parsedURL);
  const params = new URLSearchParams(parsedURL.searchParams || "");
  console.log(url)
  console.log(parsedURL)
//   url = parsedURL.pathname || "";
  console.log(url)

  config.params = params;

  console.log(config);
  let response;
  response = await axios[method]<IGlobalResponse<T>>(url, data, config);

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
    return GlobalAxios<IMyTable>("post", "/formdata", null);
  },
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
