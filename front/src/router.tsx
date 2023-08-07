import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { DisplayPage } from "./pages/displayPage";
import { IUpFileName, UploadPage } from "./pages/uploadPage";
import { HandlePage } from "./pages/handlePage";
import { useState } from "react";

export function Routers() {

  const [upFileArr, setUpFileArr]:[IUpFileName[], React.Dispatch<React.SetStateAction<IUpFileName[]>>] = useState<IUpFileName[]>([{ fileName: "", fileType:""}]);

  return (
    <Routes>
      <Route path="/*" element={<MainPage />}>
        <Route path="upload" element={<UploadPage fileArr={upFileArr} setFileArr={setUpFileArr} />} />
        <Route path="display" element={<DisplayPage />} />
        <Route path="data-handle" element={<HandlePage/>} />
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
