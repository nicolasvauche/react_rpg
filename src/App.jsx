import { BrowserRouter, Route, Routes } from "react-router";
import appRoutes from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {appRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
