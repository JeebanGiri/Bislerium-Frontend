import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeNavigation from "./components/Resuable/HomeNavigation/HomeNavigation";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route>
            {/* <Route element={<Layout />}> */}
            {/* </Route> */}
            {/* <HomeNavigation /> */}
            <Route path="" element={<HomeNavigation />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
