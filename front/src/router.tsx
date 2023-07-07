import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { DisplayPage } from "./pages/displayPage";

export function Routers() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />}>
        <Route path="display" element={<DisplayPage />} />
        <Route path="upload" element={<></>} />
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
