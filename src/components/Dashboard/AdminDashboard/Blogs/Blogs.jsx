import { useState } from "react";
import styles from "./Blogs.module.css";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "react-query";
import {
  deleteBlog,
  deleteBloggerBlog,
  getAllBlog,
} from "../../../../constants/Api";

const Blogs = () => {
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
  const [top, setTop] = useState("topLeft");
  const [bottom, setBottom] = useState("bottomRight");

  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");

  //--------FETCH Blogger INFO-------------
  const { data: BlogInfo } = useQuery("blog-details", () => getAllBlog(token));

  console.log(BlogInfo, "bloginfo");

  const blogId = BlogInfo?.data[0]?.id;
  console.log(blogId, "Blogid");

  const tableData = BlogInfo?.data;

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBloggerBlog(blogId, token);
      queryClient.invalidateQueries("blog-details");

      // Optimistically update the frontend state by removing the deleted room
      queryClient.setQueryData("blog-details", (oldData) =>
        oldData.filter((blog) => blog.id !== blogId)
      );

      // Optionally, you can refetch the data to ensure consistency with the backend
      await queryClient.refetchQueries("blog-details");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Blog Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Create Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate) => {
        const formattedDate = new Date(createdDate).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Image",
      key: "images",
      dataIndex: "images",
      // render: (images) => (
      //   <>
      //     {images.map((image, index) => (
      //       <img
      //         key={index}
      //         src={`${BACKEND_URL}/static/rooms/${image}`}
      //         alt="Service"
      //         style={{ width: "50px", height: "50px", marginRight: "5px" }}
      //       />
      //     ))}
      //   </>
      // ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>Edit</a>
          <Popconfirm
            title="Delete the blog"
            description="Are you sure to delete this blog?"
            onConfirm={() => handleDeleteBlog(record.id)}
            onOpenChange={() => console.log("open change")}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className={styles["blogger-blogs"]}>
        <div className={styles.title}>
          <h4>Blogs Lists</h4>
        </div>
        <div>
          <Table
            columns={columns}
            pagination={{
              position: [bottom],
            }}
            dataSource={tableData}
            rowKey={"id"}
            className={styles.customTable}
            scroll={{ y: 240 }}
          />
        </div>
      </div>
    </>
  );
};
export default Blogs;
