import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { DisplayPage } from "./pages/displayPage";
import { UploadPage } from "./pages/uploadPage";

export function Routers() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />}>
        <Route path="display" element={<DisplayPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="else" element={<></>} />
      </Route>

      <Route
        index
        element={
          <Navigate
            to={"display"}
            replace
          />
        }
      />
    </Routes>
  );
}
