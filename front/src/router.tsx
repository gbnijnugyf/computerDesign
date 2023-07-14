import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { DisplayPage } from "./pages/displayPage";
import { IUpFileHandle, IUpFileName, UploadPage } from "./pages/uploadPage";
import { HandlePage } from "./pages/handlePage";
import { useState } from "react";
import { IMyTable } from "./component/Mytable";
import { IDisplayHandle } from "./props&interface/commonHook";

export function Routers() {
  const formInit: IMyTable = {
    formCol: [
      { title: "", dataIndex: "key" },
    ],
    formData: undefined,
  };
  const [upFileName, setUpFileName] = useState<IUpFileName>({ fileName: "", fileType:"", isFirst: true });
  const [form, setForm] = useState<IMyTable>(formInit);

  const upFileHandles: IUpFileHandle = {
    fileName: upFileName,
    setFileName: setUpFileName
  }
  const displayHandles: IDisplayHandle = {
    form: form,
    setForm: setForm
  }

  return (
    <Routes>
      <Route path="/*" element={<MainPage />}>
        <Route path="upload" element={<UploadPage upFileHandle={upFileHandles} displayHandle={displayHandles} />} />
        <Route path="display" element={<DisplayPage upFileHandle={upFileHandles} displayHandle={displayHandles}  />} />
        <Route path="data-handle" element={<HandlePage />} />
        <Route path="else" element={<></>} />
      </Route>

      <Route
        index
        element={
          <Navigate
            to={"upload"}
            replace
          />
        }
      />
    </Routes>
  );
}
