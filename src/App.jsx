import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route>
            <Route element={<Layout />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
