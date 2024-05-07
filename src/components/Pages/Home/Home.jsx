import styles from "./Home.module.css";
import RegisterImg from "../../../assets/Images/Blog/blog.jpeg";
import { useNavigate } from "react-router-dom";
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
        {/* <header className={styles.header}>
          <h2>Welcome to Our Blog</h2>
        </header> */}
        <div className={styles.landingpage}>
          <section className={styles.blog} id="blog">
            <div className="container">
              <div className={styles.title}>
                <h2>Latest Blog</h2>
                <p>recent blogs about art & design</p>
              </div>
              <div className={styles["blog-content"]}>
                <div className={styles["blog-item"]}>
                  <div className={styles["blog-img"]}>
                    <img
                      src={RegisterImg}
                      alt=""
                      style={{ height: "400px", width: "380px" }}
                    />
                  </div>

                  <div className={styles["blog-text"]}>
                    <span>20 January, 2020</span>
                    <h2>Lorem ipsum, dolor sit amet consectetur adipisicing</h2>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Omnis libero quas ipsum laudantium nihil! Quaerat.
                    </p>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Home;
