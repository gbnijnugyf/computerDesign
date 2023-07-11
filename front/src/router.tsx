import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { DisplayPage } from "./pages/displayPage";
import { IUpFileName, UploadPage } from "./pages/uploadPage";
import { HandlePage } from "./pages/handlePage";
import { useState } from "react";

export function Routers() {

  const [upFileName, setUpFileName]:[IUpFileName, React.Dispatch<React.SetStateAction<IUpFileName>>] = useState<IUpFileName>({ fileName: "", isFirst: true });

  return (
    <Routes>
      <Route path="/*" element={<MainPage />}>
        <Route path="upload" element={<UploadPage fileName={upFileName} setFileName={setUpFileName} />} />
        <Route path="display" element={<DisplayPage fileName={upFileName} setFileName={setUpFileName}/>} />
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
