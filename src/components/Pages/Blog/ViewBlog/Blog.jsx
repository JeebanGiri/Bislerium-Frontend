/* eslint-disable no-unused-vars */
import styles from "./Blog.module.css";
import { RiAdminFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { LuHeartOff } from "react-icons/lu";
import Blogs from "../../../../assets/Images/Blog/blog.jpeg";
import { VscHeartFilled } from "react-icons/vsc";
import { IoIosHeartDislike } from "react-icons/io";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBlogById, getRecentBlog } from "../../../../constants/Api";
import { formatDate } from "../../../../constants/formatDate";

const Blog = () => {
  const [likeActive, setLikeActive] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [likes, setLikes] = useState(3);
  const [dislikeActive, setDislikeActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);
  const [searchParams, setSearchParam] = useSearchParams();

  const BlogId = searchParams.get("blogId");
  console.log(BlogId, "Blogs");

  const toggleLike = () => {
    setLikeActive(!likeActive);

    if (likeActive) {
      setLikes(likes + 1);
    }
  };

  const toggleDislike = () => {
    setDislikeActive(!dislikeActive);
  };

  const toggleComment = () => {
    setCommentActive(!commentActive);
  };

  const handleLoginPopup = () => {
    setOpenLogin(!openLogin);
  };

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

  const {
    data: RecentBlog,
    isLoading,
    isError,
  } = useQuery("recent-blog", () => getRecentBlog(BlogId));

  const { data: BlogInfo } = useQuery("blog-info", () => getBlogById(BlogId));
  console.log(BlogInfo, "blogger blog");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const recentBlogData = RecentBlog?.data;
  console.log(recentBlogData);

  const blog = BlogInfo.data;

  return (
    <>
      <div className={styles.blogpage}>
        <div className={styles.header}>
          <p className={styles.titles}>{blog.title}</p>
          <div className={styles.results}>
            <span>
              <RiAdminFill /> {blog.User ? blog.User.fullName : "Unknown"}
            </span>
            <span>
              <CiCalendarDate /> {formatDate(blog.createdDate)}
            </span>
            <span>
              <FiEye /> 8
            </span>
          </div>
          <div className={styles.blogimg}>
            <img src={Blogs} alt="Blog" />
          </div>
          <div className={styles.voting}>
            <p className={styles["voting-content"]}>
              <span className={styles.icons} onClick={handleLoginPopup}>
                {likeActive ? (
                  <VscHeartFilled className={styles.filledheart} />
                ) : (
                  <FaRegHeart />
                )}
              </span>
              {/* {openLogin ? <LoginPopup /> : null} */}
              <span className={styles["vote-text"]}>{likes} Like</span>
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
            <p>{blog.content}</p>
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
              <p className={styles.bolgss}>
                {/* Loop through recent blog data and render list items */}
                {recentBlogData.map((blog) => (
                  <li key={blog.id}>
                    {blog.title} - {formatDate(blog.createdDate)}
                  </li>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
