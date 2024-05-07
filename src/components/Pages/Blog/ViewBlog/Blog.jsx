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

const Blog = () => {
  const [likeActive, setLikeActive] = useState(false);
  const [likes, setLikes] = useState(3);
  const [dislikeActive, setDislikeActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);

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
            <p className={styles["voting-content"]}>
              <span className={styles.icons} onClick={toggleLike}>
                {likeActive ? (
                  <VscHeartFilled className={styles.filledheart} />
                ) : (
                  <FaRegHeart />
                )}
              </span>
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              pariatur eum nulla accusamus, fugit nobis modi laboriosam
              blanditiis. Maiores illum expedita dicta in, error iure laborum
              voluptate autem unde blanditiis aperiam accusamus nisi sed
              repudiandae tempore eum nobis, optio non. Iure adipisci dolor
              ullam necessitatibus aut ea quae aliquid magnam!
            </p>
          </div>
        </div>
        <div className={styles["blog-fotter"]}>
          <div className={styles["comment-section"]}>
            <p>Comment (0)</p>
            <p className={styles.commentlines}>
              <hr />
            </p>
            <p>No comments found</p>
            <p className={styles.commentbox}>leave a comment</p>
            <label htmlFor="comment" className={styles.commentlabel}>
              Message
            </label>
            <textarea
              name="comment"
              id="comment"
              className={styles.commentTextArea}
              rows={3}
              cols={50}
            ></textarea>
            <div className={styles["comment-btn"]}>
              <button type="submit">Submit</button>
            </div>
          </div>
          <div className={styles["recent-blog"]}>
            <p className={styles.bloglines}>
              <hr className={styles.hrStyle} />
            </p>
            <p>Recent Blog</p>
            <p className={styles.bloglines}>
              <hr />
            </p>
            <li>This is blog1</li>
            <li>This is blog2</li>
            <li>This is blog3</li>
            <li>This is blog4</li>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
