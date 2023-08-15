import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import Details from "./pages/details";
import Update from "./pages/update";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Index />}></Route>
        <Route path="/details" element={<Details />}></Route>
        <Route path="/details/:id" element={<Update />}></Route>
      </Routes>
    </>
  );
}

export default App;
