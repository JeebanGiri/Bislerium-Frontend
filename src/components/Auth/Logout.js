import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigatetTo = useNavigate();
  const token = localStorage.getItem("token");
  localStorage.removeItem(token);
  navigatetTo("/login");
};
export default Logout;
