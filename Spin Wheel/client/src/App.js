import { Route, Routes } from "react-router-dom";
import SpinWheel from "./pages/SpinWheel.js";
import UserAdd from "./pages/UserAdd.js";
import UserUpdate from "./pages/UserUpdate.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={""} element={<SpinWheel />}></Route>
        <Route path={"/add"} element={<UserAdd />}></Route>
        <Route path={"/update/:id"} element={<UserUpdate />}></Route>
      </Routes>
    </div>
  );
}

export default App;
