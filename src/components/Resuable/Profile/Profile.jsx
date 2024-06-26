import styles from "./Profile.module.css";
import { CgProfile } from "react-icons/cg";
import { useQuery } from "react-query";
import { userProfile } from "../../../constants/Api";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { TbBrandBlogger } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleEditProfile = (e) => {
    e.preventDefault();
    navigateTo("/edit-profile");
  };

  const handleBlogPage = () => {
    navigateTo("/my-blogs");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/login");
    setTimeout(() => {
      toast.warn("Logout Successfully!");
      // Reload the page after the message is displayed
      window.location.reload();
    }, 0);
  };
  const { data } = useQuery("get-profile", () => userProfile(token));
  console.log(data, "datas");

  return (
    <>
      {data ? (
        <div className={styles.profilebox}>
          <span className={styles.profilename}>
            <p>{data?.data.fullName}</p>
          </span>
          <span className={styles.emails}>
            <IoMailOutline className={styles.icons} />
            <li>{data.data.email}</li>
          </span>
          <hr />
          <span className={styles.profiles}>
            <CgProfile className={styles.icons} />
            <li onClick={handleEditProfile}>My Profile</li>
          </span>
          <span className={styles.profiles}>
            {role === "Blogger" ? (
              <>
                <TbBrandBlogger className={styles.icons} />
                <li onClick={handleBlogPage}>My Blogs</li>
              </>
            ) : null}
          </span>
          <span className={styles.profiles} onClick={handleLogout}>
            <LuLogOut className={styles.icons} />
            <li onClick={handleEditProfile}>Logout</li>
          </span>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
