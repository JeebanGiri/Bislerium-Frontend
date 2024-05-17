import styles from "./Blog.module.css";
import { RiAdminFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { LuHeartOff } from "react-icons/lu";
import { VscHeartFilled } from "react-icons/vsc";
import { IoIosHeartDislike } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";
import { Popconfirm } from "antd";
import { Modal } from "antd";
import { Flex, Input } from "antd";

import {
  createComment,
  deleteComment,
  downVote,
  getBlogById,
  getComment,
  getRecentBlog,
  getTotalLikes,
  upVote,
  updateComment,
} from "../../../../constants/Api";
import { formatDate } from "../../../../constants/formatDate";
import Footer from "../../Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useQueryClient } from "react-query";
import { Backend_Image } from "../../../../constants/constant";

const { TextArea } = Input;

const Blog = () => {
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);
  const [searchParams, setSearchParam] = useSearchParams();
  const BlogId = searchParams.get("blogId");
  const [userId, setUserId] = useState(null);
  const deleteIconRef = useRef(null);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState("");

  const [commentData, setCommentData] = useState({
    content: "",
    blogId: BlogId,
  });

  const [commentDatas, setCommentDatas] = useState({
    content: "",
    Id: "",
  });

  const showModal = (cmtId, content) => {
    setEditingCommentId(cmtId);
    setCommentDatas({ content: content, Id: cmtId });
    setIsModalOpen(true);
  };

  const handleOk = (event) => {
    setIsModalOpen(false);
    handleUpdateComment(event);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCommentChanges = (event) => {
    const { name, value } = event.target;
    setCommentDatas({ ...commentDatas, [name]: value });
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Assuming you have the token stored in a variable called 'token'
      const user = jwtDecode(token);
      // const decodedUserId = user.sub; // 'sub' is the standard claim for user ID
      const decodedUserId =
        user[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]; // Look for NameIdentifier claim for user ID
      setUserId(decodedUserId);
    } else {
      // If token doesn't exist, set userId state to null
      setUserId(null);
    }
  }, [token]);

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setCommentData({ ...commentData, [name]: value });
  };

  const {
    data: RecentBlog,
    isLoading: recentBlogLoading,
    isError: recentBlogError,
  } = useQuery("recent-blog", () => getRecentBlog(BlogId));

  const {
    data: BlogInfo,
    isLoading: blogInfoLoading,
    isError: blogInfoError,
  } = useQuery("blog-info", () => getBlogById(BlogId));

  const {
    data: totalLike,
    isLoading: totalLikeLoading,
    isError: totalLikeError,
  } = useQuery("total-likes", () => getTotalLikes(BlogId));

  const { data: commentInfo, refetch: refetchComments } = useQuery(
    "comment-info",
    () => getComment(BlogId)
  );

  if (recentBlogLoading || blogInfoLoading || totalLikeLoading)
    return <div>Loading...</div>;
  if (recentBlogError || blogInfoError || totalLikeError)
    return <div>Error fetching data</div>;

  const recentBlogData = RecentBlog?.data;
  const blog = BlogInfo?.data;
  console.log(blog);
  const comment = commentInfo?.data;
  console.log(comment, "comment");

  const likeDate = {
    blogId: blog?.id,
    reactionType: true,
  };

  const disLikeDate = {
    blogId: blog?.id,
    reactionType: false,
  };

  const handleLikeUpload = () => {
    setLikeActive(!likeActive);
    const token = localStorage.getItem("token");
    if (!token) {
      // User is not logged in, show error message
      toast.error("Please log in first to like the post");
      return;
    }
    upVote(likeDate, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          console.log(response.data.message);
          const message = response.data.message;
          if (response.data.message === "Cannot upvote a downvoted post") {
            toast.warning(message);
          } else {
            toast.success(message);
          }
        } else {
          if (response.status === 401) {
            toast.warn("Please Login before to Like");
          }
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

  const handleDisLikeUpload = () => {
    setDislikeActive(!dislikeActive);
    const token = localStorage.getItem("token");
    if (!token) {
      // User is not logged in, show error message
      toast.error("Please log in first to Dis like the post");
      return;
    }
    downVote(disLikeDate, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          const message = response.data.message;
          if (response.data.message === "Cannot downvote an upvoted post") {
            toast.warning(message);
          } else {
            toast.success(message);
          }
        } else {
          if (errors === 401) {
            toast.warn("Please Login before to Like");
          }
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

  const handleCommentUpload = (event) => {
    event.preventDefault();
    setCommentActive(!commentActive);
    if (commentData.content.trim() === "") {
      toast.warn("Comment should not be empty");
      return; // Exit the function if comment content is empty
    }
    const token = localStorage.getItem("token");
    createComment(commentData, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const message = response.data.message;
          toast.success(message);
          setCommentData((prevData) => ({ ...prevData, content: "" }));
          refetchComments();
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
  const handleDeleteComment = (cmtId) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");
    deleteComment(cmtId, token)
      .then((response) => {
        const message = response.data;
        toast.success(message);

        // Remove the deleted comment from the comments array
        queryClient.setQueryData("comment-info", (oldData) => ({
          data: oldData.data.filter((cmt) => cmt.id !== cmtId),
        }));
      })
      .catch((error) => {
        const errorMsg = error.response.data.message || error.response.data;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  };

  const handleUpdateComment = (event) => {
    event.preventDefault();

    if (commentDatas.content.trim() === "") {
      toast.warn("Comment should not be empty");
      return; // Exit the function if comment content is empty
    }
    const token = localStorage.getItem("token");
    updateComment(commentDatas, token)
      .then((response) => {
        // if (response.status === 200 || response.status === 201) {
        const message = response.data.message;
        toast.success(message);
        console.log(response);
        // setCommentDatas((prevData) => ({ ...prevData, content: "" }));
        setCommentDatas({ ...commentDatas, content: "" });
        refetchComments();
        // } else {
        const errors = response.data.errors;
        console.log(errors);
        Object.values(errors).forEach((errorArr) => {
          errorArr.forEach((errMsg) => {
            toast.error(errMsg);
          });
        });
        // }
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
                <RiAdminFill /> {blog?.user ? blog?.user.fullName : "Unknown"}
              </span>
              <span>
                <CiCalendarDate /> {formatDate(blog?.createdDate)}
              </span>
              <span>
                <FiEye /> 8
              </span>
            </div>
            <div className={styles.blogimg}>
              {blog.image ? (
                <img
                  src={`${Backend_Image}/Images/${blog?.image}`}
                  alt="Blog Image"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className={styles.voting}>
              <p className={styles["voting-content"]}>
                <span className={styles.icons} onClick={handleLikeUpload}>
                  {likeActive || blog.total_Like ? (
                    <VscHeartFilled
                      name="totalLike"
                      className={styles.filledheart}
                    />
                  ) : (
                    <FaRegHeart name="totalLike" />
                  )}
                </span>
                <span className={styles["vote-text"]}>
                  {blog.total_Like} Like
                </span>
              </p>
              <p className={styles["voting-content"]}>
                <span className={styles.icons} onClick={handleDisLikeUpload}>
                  {dislikeActive || blog.total_DisLike ? (
                    <IoIosHeartDislike />
                  ) : (
                    <LuHeartOff />
                  )}
                </span>
                <span className={styles["vote-text"]}>
                  {blog.total_DisLike} DisLike
                </span>
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
              {comment && comment.length > 0 ? (
                // Render comments if they exist
                comment.map((cmt) => (
                  <div className={styles["comment-body"]} key={cmt.id}>
                    <div className={styles.pbox}>
                      {cmt.user.fullName.charAt(0).toUpperCase()}
                      {cmt.user.fullName.split(" ")[1]
                        ? cmt.user.fullName
                            .split(" ")[1]
                            .charAt(0)
                            .toUpperCase()
                        : ""}
                    </div>
                    <div className={styles["comment-parts"]}>
                      <div className={styles["name-comment"]}>
                        <span>{cmt.user.fullName}</span>
                        <span>{cmt.content}</span>
                      </div>
                      {cmt?.authorId === userId && (
                        <div className={styles.openable}>
                          <div className={styles["openablebox"]}>
                            <div className={styles["edit-action"]}>
                              <span>
                                <span
                                  onClick={() => showModal(cmt.id, cmt.content)}
                                >
                                  <CiEdit name="cmtId" />
                                </span>
                                <Modal
                                  title="Update Comment"
                                  open={isModalOpen}
                                  onOk={handleOk}
                                  onCancel={handleCancel}
                                  value={cmt.content}
                                >
                                  <Flex vertical gap={32}>
                                    <TextArea
                                      showCount
                                      maxLength={100}
                                      name="content"
                                      onChange={handleCommentChanges}
                                      placeholder="leave your comment"
                                      style={{
                                        height: 120,
                                        resize: "none",
                                      }}
                                    />
                                  </Flex>
                                </Modal>
                              </span>
                            </div>
                            <div className={styles["delete-action"]}>
                              <span ref={deleteIconRef}>
                                <Popconfirm
                                  title="Delete comment"
                                  description="Are you sure to delete this comment?"
                                  okText="Yes"
                                  cancelText="No"
                                  onConfirm={() => handleDeleteComment(cmt.id)}
                                  getPopupContainer={() =>
                                    deleteIconRef.current
                                  }
                                >
                                  <MdDelete />
                                </Popconfirm>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                // Display message if no comments
                <p>No comments yet</p>
              )}
              <p className={styles.commentbox}>leave a comment</p>
              <hr />
              <label htmlFor="comment" className={styles.commentlabel}>
                Message
              </label>
              <textarea
                name="content"
                id="comment"
                className={styles.commentTextArea}
                onChange={handleCommentChange}
                rows={3}
                required
              ></textarea>
              <div className={styles["comment-btn"]}>
                <button type="submit" onClick={handleCommentUpload}>
                  Submit
                </button>
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
