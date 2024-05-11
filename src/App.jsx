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
import ViewBlog from "./components/Pages/Blog/ViewBlog/Blog";
import CreateBlog from "./components/Pages/Blog/AddBlog/CreateBlog";
import LoginPopup from "./components/Auth/LoginPopup/LoginPopup";
import ViewBloggerBlog from "./components/Pages/Blog/ViewBloggerBlog/ViewBloggerBlog";
import AdminDashboard from "./components/Dashboard/AdminDashboard/AdminDashboard";
import AdminLayout from "./components/Layout/Admin/AdminLayout";
import BlogHistory from "./components/Dashboard/AdminDashboard/BlogHistory/BlogHistory";
import Blogs from "./components/Dashboard/AdminDashboard/Blogs/Blogs";
import AddAdmin from "./components/Dashboard/AdminDashboard/AddAdmin/AddAdmin";
import EditBlog from "./components/Pages/Blog/EditBlog/EditBlog";
import ForgetPassword from "./components/Auth/ForgetPassword/ForgetPassword";
import { setupNotifications } from "./utils/Firebase";

function App() {
  setupNotifications();
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
              <Route path="/blog" element={<ViewBlog />} />
              <Route path="/my-blogs" element={<ViewBloggerBlog />} />
              <Route path="/login-direct" element={<LoginPopup />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/edit-blog" element={<EditBlog />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/edit-profile" element={<EditProfleLayout />}>
                <Route path="" element={<ChangePersonaldetails />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>

              <Route path="/admin-dashboard" element={<AdminLayout />}>
                <Route path="" element={<AdminDashboard />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="sub-admin" element={<AddAdmin />} />
                <Route path="blog-history" element={<BlogHistory />} />
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
