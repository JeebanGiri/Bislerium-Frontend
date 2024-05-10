import styles from "./Home.module.css";
import RegisterImg from "../../../assets/Images/Blog/blog.jpeg";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useQuery } from "react-query";
import { getAllBlog, getRecentBlog } from "../../../constants/Api";
import { formatDate } from "../../../constants/formatDate";

const Home = () => {
  const navigateTo = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token);

  const toggleCreateBlog = () => {
    navigateTo("/create-blog");
  };

  const goToBlog = (e, blogId) => {
    e.preventDefault();
    // Navigate to the blog page with the clicked blogId as a query parameter
    navigateTo(`/blog?blogId=${blogId}`);
  };

  //--------FETCH Blogger INFO-------------
  const {
    data: BlogInfo,
    isLoading,
    isError,
  } = useQuery("blog-details", () => getAllBlog());

  const { data: RecentBlog } = useQuery("recent-blog", () => getRecentBlog());

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  console.log(BlogInfo, "bloginfo");
  console.log(RecentBlog, "Recent Blog");

  const tableData = BlogInfo?.data;
  console.log(tableData);

  const recentBlogData = RecentBlog?.data;
  console.log(recentBlogData);

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
                    <button onClick={(e) => goToBlog(e, blog.id)}>
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
              <ol type="circle" className={styles.bolgss}>
                {/* Loop through recent blog data and render list items */}
                {recentBlogData.map((blog) => (
                  <li key={blog.id}>
                    {blog.title} - {formatDate(blog.createdDate)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
