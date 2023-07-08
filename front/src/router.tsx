import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { DisplayPage } from "./pages/displayPage";
import { UploadPage } from "./pages/uploadPage";
import { HandlePage } from "./pages/handlePage";

export function Routers() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />}>
        <Route path="upload" element={<UploadPage />} />
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
