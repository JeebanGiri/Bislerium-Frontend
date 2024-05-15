import { useQuery } from "react-query";
import styles from "./AdminDashboard.module.css";
import { userProfile } from "../../../constants/Api";
import { FaNoteSticky, FaUser } from "react-icons/fa6";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const { data } = useQuery("get-profile", () => userProfile(token));
  console.log(data);

  return (
    <>
      <div className={styles.adminhome}>
        {data ? (
          <div className={styles.title}>
            <h4>Welcome {data?.data.fullName},</h4>
          </div>
        ) : null}
        <div className={styles.AdminDashboard}>
          <div className={styles.content}>
            <div className={styles.container}>
              <span className={styles.board}>
                <p>Total Upvotes</p>
                <h2>12,345</h2>
              </span>
              <span className={styles.icon}>
                <FaUser />
              </span>
            </div>
            <div className={styles.container}>
              <span className={styles.board}>
                <p>Total Upvotes</p>
                <h2>12,345</h2>
              </span>
              <span className={styles.icon}>
                <FaNoteSticky />
              </span>
            </div>
            <div className={styles.container}>
              <span className={styles.board}>
                <p>Total Upvotes</p>
                <h2>12,345</h2>
              </span>
              <span className={styles.icon}>
                <BiSolidUpvote />
              </span>
            </div>
            <div className={styles.container}>
              <span className={styles.board}>
                <p>Total Downvotes</p>
                <h2>12,345</h2>
              </span>
              <span className={styles.icon}>
                <BiSolidDownvote />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
