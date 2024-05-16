import { useQuery } from "react-query";
import styles from "./AdminDashboard.module.css";
import { getDashboardDetails, userProfile } from "../../../constants/Api";
import { FaNoteSticky, FaUser } from "react-icons/fa6";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const { data: adminInfo } = useQuery("get-profile", () => userProfile(token));

  const { data: dashboardInfo } = useQuery("get-info", () =>
    getDashboardDetails(token)
  );
  const dashboard = dashboardInfo?.data;
  console.log(dashboard);
  return (
    <>
      <div className={styles.adminhome}>
        {adminInfo ? (
          <div className={styles.title}>
            <h4>Welcome {adminInfo?.data.fullName},</h4>
          </div>
        ) : null}
        <div className={styles.AdminDashboard}>
          {dashboard ? (
            <div className={styles.content}>
              <div className={styles.container}>
                <span className={styles.board}>
                  <p>Total Users</p>
                  <h2>{dashboard.totalUserCount}</h2>
                </span>
                <span className={styles.icon}>
                  <FaUser />
                </span>
              </div>
              <div className={styles.container}>
                <span className={styles.board}>
                  <p>Total Blogs Post</p>
                  <h2>{dashboard.totalBlogPost}</h2>
                </span>
                <span className={styles.icon}>
                  <FaNoteSticky />
                </span>
              </div>
              <div className={styles.container}>
                <span className={styles.board}>
                  <p>Total Upvotes</p>
                  <h2>{dashboard.totalLikes}</h2>
                </span>
                <span className={styles.icon}>
                  <BiSolidUpvote />
                </span>
              </div>
              <div className={styles.container}>
                <span className={styles.board}>
                  <p>Total Downvotes</p>
                  <h2>{dashboard.totalDislikes}</h2>
                </span>
                <span className={styles.icon}>
                  <BiSolidDownvote />
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
