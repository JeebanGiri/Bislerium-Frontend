import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7259/api",
});

// ---------REGISTER BLOGGER-------------
export const registerBolgger = (newUser) =>
  api.post("/User/register-user", newUser);

// ---------REGISTER BLOGGER-------------
export const registerSubAdmin = (newUser) =>
  api.post("/User/register-user", newUser);

// ---------LOGIN USER-------------
export const loginBolgger = (newUser) => api.post("/User/login-user", newUser);

// ---------GET PROFILE------------
export const userProfile = (token) =>
  api.get("/User/current-user", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getSubAdmin = (token) =>
  api.get("User/get-users", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProfile = (updateProfile, token) =>
  api.put("/Users/current-user", updateProfile, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const changePassword = (updatePassword, token) =>
  api.put("/User/change-password", updatePassword, {
    headers: { Authorization: `Bearer ${token}` },
  });

// create hotel
export const createBlog = async (newBlog, token) =>
  api.post("/Blog/create-blog", newBlog, {
    headers: { Authorization: `Bearer ${token}` },
  });

// get blogger blog
export const getBloggerBlog = async (token) =>
  api.get("/Blog/get-blog", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getBlogById = (blogId) => api.get(`/Blog/get-blog/${blogId}`);

// ----------DELETE THE Blog ----------------
export const deleteBlog = (blogId, token) =>
  api.delete(`/Blog/delete-blog/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBloggerBlog = (blogId, token) =>
  api.delete(`/Blog/delete-blog/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// -----GET ALL BLOG-----------------
export const getAllBlog = async (token) =>
  api.get("/Blog/get-all-blog", {
    headers: { Authorization: `Bearer ${token}` },
  });

// -----GET Recent BLOG-----------------
export const getRecentBlog = () => api.get("/Blog/recent-blog");

// ----------GET NOTICATION---------
export const getNotification = (token) =>
  api.get("/Blog/recent-blog", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ----------DELETE THE Sub Admin ----------------
export const deleteSubAdmin = (adminId, token) =>
  api.delete(`/User/delete-user/${adminId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const saveNotificationToken = (data, token) => {
  return api.post("/firebase/save-token", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const upVote = (blogLike, token) =>
  api.post("/BlogLike/upvote", blogLike, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const downVote = (blogDisLike, token) =>
  api.post("/BlogLike/downvote", blogDisLike, {
    headers: { Authorization: `Bearer ${token}` },
  });
