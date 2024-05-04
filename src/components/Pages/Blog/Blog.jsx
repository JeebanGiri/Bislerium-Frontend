import styles from "./Blog.module.css";
import { RiAdminFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoHeartDislikeOutline } from "react-icons/io5";

const Blog = () => {
  const date = new Date();

  // Format options for displaying the date and time
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  // Get the formatted date and time string
  const formattedDateTime = date.toLocaleString("en-US", options);

  return (
    <>
      <div className={styles.blogpage}>
        <div className={styles.header}>
          <p>Blog Title</p>
          <div className={styles.results}>
            <span>
              <RiAdminFill /> admin
            </span>
            <span>
              <CiCalendarDate /> {formattedDateTime}
            </span>
            <span>
              <FaEye /> 8
            </span>
          </div>
          <div className={styles.blogimg}>
            <img src="" alt="" />
          </div>
          <div className={styles.voting}>
            <p>
              <span>
                <FcLikePlaceholder />
              </span>
              <span>10</span>
            </p>
            <p>
              <span>
                {" "}
                <IoHeartDislikeOutline />
              </span>
              <span>2</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
