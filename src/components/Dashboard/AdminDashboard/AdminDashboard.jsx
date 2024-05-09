import { useQuery } from "react-query";
import styles from "./AdminDashboard.module.css";
import { userProfile } from "../../../constants/Api";
const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const { data } = useQuery("get-profile", () => userProfile(token));
  console.log(data);

  return (
    <>
      <div className={styles.container}>
        {data ? (
          <div className={styles.title}>
            <h4>Welcome {data?.data.fullName},</h4>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default AdminDashboard;
