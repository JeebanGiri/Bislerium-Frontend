import styles from "./Home.module.css";
import RegisterImg from "../../../assets/Images/Blog/blog.jpeg";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

const Home = () => {
  const navigateTo = useNavigate();
  const toggleCreateBlog = () => {
    navigateTo("/create-blog");
  };
  return (
    <>
      <div className={styles["blog-landing"]}>
        <div className={styles.header}>
          <span className={styles.titles}>Welcome to Bislerium Blog</span>
          <span className={styles.createblog}>
            <button type="submit" onClick={toggleCreateBlog}>
              Create Blog
            </button>
          </span>
        </div>
        <div className={styles.landingpage}>
          <div className={styles["box-frame"]}>
            <div className={styles["blog-box"]}>
              <div className={styles["img-side"]}>
                <img src={RegisterImg} alt="Blog 1" />
              </div>
              <div className={styles["content-side"]}>
                <div className={styles.blogtitle}>
                  <p>Title of the Blog where it arise?</p>
                </div>
                <span className={styles.blogdetails}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam a, iure quidem repudiandae tempora blanditiis
                    mollitia! Dolor impedit fugit ipsum?
                  </p>
                  <button>Continue Reading</button>
                </span>
                <span className={styles["footer-side"]}>
                  <span>
                    <FaRegEdit /> author name
                  </span>
                  <span>
                    <BsCalendarDate /> date
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={styles["recent-blog"]}>
            <div>
              <p>Recent Post</p>
              <p className={styles.bolgss}>
                <li>This is blog1</li>
                <li>This is blog2</li>
                <li>This is blog3</li>
                <li>This is blog4</li>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
