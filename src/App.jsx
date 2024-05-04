import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Home from "./components/Pages/Home/Home";
import HomeLayout from "./components/Layout/HomeLayout";
import ChangePersonaldetails from "./components/Resuable/EditProfile/ChangePersonalDetails";
import ChangePassword from "./components/Resuable/EditProfile/ChangePassword";
import EditProfleLayout from "./components/Layout/EditProfileLayout";
import PageNotFound from "./utils/PageNotFound";

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          closeOnClick
          draggable
          pauseOnHover
          style={{ fontSize: "14px" }}
        />
        <Routes>
          <Route>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route path="/edit-profile" element={<EditProfleLayout />}>
                <Route path="" element={<ChangePersonaldetails />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
