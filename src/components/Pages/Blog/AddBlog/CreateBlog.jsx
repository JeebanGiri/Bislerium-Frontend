import styles from "./CreateBlog.module.css";
const CreateBlog = () => {
  return (
    <>
      <div className={styles["create-blog"]}>
        <p>Create your feeds</p>
        <div className={styles["blog-article"]}>
          <div className={styles.header}>Create Blog</div>
          <hr />
          <div className={styles["blog-content"]}>
            <span className={styles["title-input"]}>
              <label htmlFor="blog-title">Title</label> <br />
              <input type="text" name="title" id="blog-title" />
            </span>
            <span className={styles["textarea-input"]}>
              <label htmlFor="content">Post Details</label> <br />
              <textarea
                name="content"
                id="content"
                className={styles.commentTextArea}
                rows={10}
              ></textarea>
            </span>
            <span className={styles["img-input"]}>
              <label htmlFor="imges">Choose Image</label>
              <br />
              <input type="file" name="blog" multiple />
            </span>
            <span className={styles["footer-btn"]}>
              <button>Save and Post</button>
              <button>Discard</button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateBlog;
