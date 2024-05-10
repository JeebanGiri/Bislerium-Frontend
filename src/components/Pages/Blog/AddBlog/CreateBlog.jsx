import { useState } from "react";
import styles from "./CreateBlog.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBlog } from "../../../../constants/Api";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigateTo = useNavigate();
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: "",
  });

  const handleChange = (event) => {
    const { name, files, value } = event.target;

    if (files) {
      // Store only the first file
      setFormData({
        ...formData,
        [name]: files[0],
      });
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDiscard = () => {
    // Reset the formData to its initial empty values
    setFormData({
      title: "",
      content: "",
      imageFile: "",
    });
    setImagePreview(null);
  };

  const handleCreate = () => {
    // const data = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   const value = formData[key];
    //   if (Array.isArray(value)) {
    //     value.forEach((file) => data.append(key, file));
    //   } else {
    //     data.append(key, value);
    //   }
    // });

    const data = new FormData();

    // Append title and content
    data.append("title", formData.title);
    data.append("content", formData.content);

    // Append image
    if (!formData.imageFile) {
      toast.error("Please select an image.");
      return;
    }

    if (formData.imageFile) {
      console.log(formData.imageFile);
      data.append("image", formData.imageFile);
    }

    const token = localStorage.getItem("token");

    createBlog(data, token)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const message = response.data.message;
          toast.success(message);
          setTimeout(() => {
            navigateTo("/");
          }, 2000);
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
      <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
        <div className={styles["create-blog"]}>
          <p>Create your feeds</p>
          <div className={styles["blog-article"]}>
            <div className={styles.header}>Create Blog</div>
            <hr />
            <div className={styles["blog-content"]}>
              <span className={styles["title-input"]}>
                <label htmlFor="blog-title">Title</label> <br />
                <input
                  type="text"
                  name="title"
                  id="blog-title"
                  onChange={handleChange}
                />
              </span>
              <span className={styles["textarea-input"]}>
                <label htmlFor="content">Post Details</label> <br />
                <textarea
                  name="content"
                  id="content"
                  className={styles.commentTextArea}
                  rows={10}
                  onChange={handleChange}
                ></textarea>
              </span>
              <span className={styles["img-input"]}>
                <label htmlFor="images">Choose Image</label>
                <br />
                <input type="file" name="imageFile" onChange={handleChange} />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className={styles.imagePreview}
                  />
                )}
              </span>
              <span className={styles["footer-btn"]}>
                <button onClick={handleCreate}>Save and Post</button>
                <button type="button" onClick={handleDiscard}>
                  Discard
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default CreateBlog;
