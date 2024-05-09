import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigateTo = useNavigate();

  // Clear token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/login");
    window.location.reload();
  };

  // Call handleLogout function when Logout component is mounted
  // This is optional, you might not need it depending on how you use Logout
  // If you're calling handleLogout directly, you don't need this
  useEffect(() => {
    handleLogout();
  }, []);

  return null; // Return null because this component doesn't render anything
};

export default Logout;
