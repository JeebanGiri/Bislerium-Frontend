import styles from "./Blog.module.css";
import { RiAdminFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { LuHeartOff } from "react-icons/lu";
import Blogs from "../../../assets/Images/Blog/blog.jpeg";

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
          <p className={styles.titles}>Blog Title</p>
          <div className={styles.results}>
            <span>
              <RiAdminFill /> admin
            </span>
            <span>
              <CiCalendarDate /> {formattedDateTime}
            </span>
            <span>
              <FiEye /> 8
            </span>
          </div>
          <div className={styles.blogimg}>
            <img src={Blogs} alt="Blog" />
          </div>
          <div className={styles.voting}>
            <p>
              <span>
                <FaRegHeart />
              </span>
              <span className={styles["vote-text"]}>10 Like</span>
            </p>
            <p>
              <span>
                <LuHeartOff />
              </span>
              <span className={styles["vote-text"]}>2 DisLike</span>
            </p>
            <p>
              <span>
                <FaRegComment />
              </span>
              <span className={styles["vote-text"]}>2 Comment</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
