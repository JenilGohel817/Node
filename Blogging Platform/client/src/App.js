import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.js";
import ProductFetch from "./pages/ProductFetch.js";

const App = () => {
  return (
    <div>
      <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/postFetchSingle/:id" element={<ProductFetch />}></Route>
        </Routes>
      </>
    </div>
  );
};

export default App;
