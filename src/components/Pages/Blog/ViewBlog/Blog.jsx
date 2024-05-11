/* eslint-disable no-unused-vars */
import styles from "./Blog.module.css";
import { RiAdminFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { LuHeartOff } from "react-icons/lu";
import { VscHeartFilled } from "react-icons/vsc";
import { IoIosHeartDislike } from "react-icons/io";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBlogById, getRecentBlog, upVote } from "../../../../constants/Api";
import { formatDate } from "../../../../constants/formatDate";
import Footer from "../../Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const [likeActive, setLikeActive] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);
  const [searchParams, setSearchParam] = useSearchParams();
  const BlogId = searchParams.get("blogId");

  const toggleDislike = () => {
    setDislikeActive(!dislikeActive);
  };

  const toggleComment = () => {
    setCommentActive(!commentActive);
  };

  const handleLoginPopup = () => {
    setOpenLogin(!openLogin);
  };

  const [userData, setUserData] = useState({
    totalLike: "",
  });

  const {
    data: RecentBlog,
    isLoading,
    isError,
  } = useQuery("recent-blog", () => getRecentBlog(BlogId));

  const { data: BlogInfo } = useQuery("blog-info", () => getBlogById(BlogId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  const recentBlogData = RecentBlog?.data;
  const blog = BlogInfo?.data;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...formatDate, [name]: value });
  };

  const handleLikeUpload = () => {
    setLikeActive(!likeActive);
    const token = localStorage.getItem("token");

    upVote(userData, BlogId, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          const message = response.data.message;
          toast.success(message);
        } else {
          const errors = response.data.errors;
          console.log(errors);
          Object.values(errors).forEach((errorArr) => {
            errorArr.forEach((errMsg) => {
              toast.error(errMsg);
            });
          });
        }
      })
      .catch((error) => {
        const errorMsg =
          error.response.data.message || error.response.data.errors;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  };

  return (
    <>
      <form action="">
        <div className={styles.blogpage}>
          <div className={styles.header}>
            <p className={styles.titles}>{blog?.title}</p>
            <div className={styles.results}>
              <span>
                <RiAdminFill /> {blog?.User ? blog?.User.fullName : "Unknown"}
              </span>
              <span>
                <CiCalendarDate /> {formatDate(blog?.createdDate)}
              </span>
              <span>
                <FiEye /> 8
              </span>
            </div>
            <div className={styles.blogimg}>
              <img src={blog?.images} alt="Blog" />
            </div>
            <div className={styles.voting}>
              <p className={styles["voting-content"]}>
                <span
                  className={styles.icons}
                  onChange={handleChange}
                  onClick={handleLikeUpload}
                >
                  {likeActive ? (
                    <VscHeartFilled
                      name="totalLike"
                      className={styles.filledheart}
                    />
                  ) : (
                    <FaRegHeart name="totalLike" />
                  )}
                </span>
                <span className={styles["vote-text"]}> Like</span>
              </p>
              <p className={styles["voting-content"]}>
                <span className={styles.icons} onClick={toggleDislike}>
                  {dislikeActive ? <IoIosHeartDislike /> : <LuHeartOff />}
                </span>
                <span className={styles["vote-text"]}>2 DisLike</span>
              </p>
              <p className={styles["voting-content"]}>
                <span className={styles.icons}>
                  <FaRegComment />
                </span>
                <span className={styles["vote-text"]}>2 Comment</span>
              </p>
            </div>
            <div className={styles["blog-content"]}>
              <p>{blog?.content}</p>
            </div>
          </div>
          <div className={styles["blog-fotter"]}>
            <div className={styles["comment-section"]}>
              <p>Comment (0)</p>
              <hr />
              <p>No comments found</p>
              <p className={styles.commentbox}>leave a comment</p>
              <hr />
              <label htmlFor="comment" className={styles.commentlabel}>
                Message
              </label>
              <textarea
                name="comment"
                id="comment"
                className={styles.commentTextArea}
                rows={3}
              ></textarea>
              <div className={styles["comment-btn"]}>
                <button type="submit">Submit</button>
              </div>
            </div>
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
      </form>
      <Footer />
    </>
  );
};
export default Blog;
