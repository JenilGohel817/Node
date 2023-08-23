import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import Details from "./pages/details";
import Update from "./pages/update";
import FullDetails from "./pages/full_details";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Index />}></Route>
        <Route path="/details" element={<Details />}></Route>
        <Route path="/details/:id" element={<Update />}></Route>
        <Route path="/detailsFull/:id" element={<FullDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
