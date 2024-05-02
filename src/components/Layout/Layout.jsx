import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginedNavigation from "../Resuable/LoginedNavbar/LoginedNavigation";
import HomeNavigation from "../Resuable/HomeNavigation/HomeNavigation";

const Layout = () => {
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
      {isLogin == true && role === "CUSTOMER" ? (
        <LoginedNavigation />
      ) : (
        <HomeNavigation />
      )}
      <Outlet />
    </>
  );
};
export default Layout;
