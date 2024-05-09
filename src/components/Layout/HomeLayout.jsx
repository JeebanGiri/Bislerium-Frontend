import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeNavigation from "../Resuable/HomeNavigation/HomeNavigation";
import LoginedNavigation from "../Resuable/LoginedNavbar/LoginedNavigation";

const HomeLayout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const role = localStorage.getItem("role");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      {(isLogin == true && role === "Blogger") || role === "Admin" ? (
        <LoginedNavigation />
      ) : (
        <HomeNavigation />
      )}
      <Outlet />
    </>
  );
};
export default HomeLayout;
