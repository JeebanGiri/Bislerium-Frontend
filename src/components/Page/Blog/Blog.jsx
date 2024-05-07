// import { ToastContainer } from "react-toastify";
import styles from "./Blog.module.css";
import RegisterImg from "../../../assets/Images/register.png";


const Blog = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Welcome to Our Blog</h1>
      </header>
      <div className={styles.landingpage}>
        {/* <!-- blog --> */}
        <section className={styles.blog} id="blog">
          <div className="container">
            <div className={styles.title}>
              <h2>Latest Blog</h2>
              <p>recent blogs about art & design</p>
            </div>
            <div className={styles["blog-content"]}>
              {/* <!-- item --> */}
              <div className={styles["blog-item"]}>
                <div className={styles["blog-img"]}>
                  <img src= {RegisterImg} alt="" style={{ height: '400px', width: '380px' }}/>
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
    </>
  );
};
export default Blog;
