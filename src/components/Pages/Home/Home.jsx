import styles from "./Home.module.css";
import RegisterImg from "../../../assets/Images/Blog/blog.jpeg";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useQuery } from "react-query";
import { getAllBlog } from "../../../constants/Api";
import { formatDate } from "../../../constants/formatDate";

const Home = () => {
  const navigateTo = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token);

  const toggleCreateBlog = () => {
    navigateTo("/create-blog");
  };

  const goToBlog = (e) => {
    e.preventDefault();
    navigateTo("/blog");
  };

  const imgages = {
    img1: "",
  };

  //--------FETCH Blogger INFO-------------
  const {
    data: BlogInfo,
    isLoading,
    isError,
  } = useQuery("blog-details", () => getAllBlog());

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  console.log(BlogInfo, "bloginfo");

  const blogId = BlogInfo?.data[0]?.id;
  console.log(blogId, "Blogid");

  const tableData = BlogInfo?.data;
  console.log(tableData);

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
          {tableData.map((blog) => (
            <div key={blog.id} className={styles["box-frame"]}>
              <div className={styles["blog-box"]}>
                <div className={styles["img-side"]}>
                  <img src={RegisterImg} alt="Blog" />
                </div>
                <div className={styles["content-side"]}>
                  <div className={styles.blogtitle}>
                    <p>{blog.title}</p>
                  </div>
                  <span className={styles.blogdetails}>
                    <p>{blog.content}</p>
                    <button onClick={() => goToBlog(blog.id)}>
                      Continue Reading
                    </button>
                  </span>
                  <span className={styles["footer-side"]}>
                    <span>
                      <FaRegEdit /> {blog.User ? blog.User.fullName : "Unknown"}
                    </span>
                    <span>
                      <BsCalendarDate /> {formatDate(blog.createdDate)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
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
