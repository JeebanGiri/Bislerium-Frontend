import { Outlet } from "react-router-dom";
import SideNav from "../../Dashboard/AdminDashboard/SideNav";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
  return (
    <>
      <div className={styles["admin-container"]}>
        <div className={styles["admin-page"]}>
          <SideNav />
        </div>
        <div className={styles["admin-component"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
