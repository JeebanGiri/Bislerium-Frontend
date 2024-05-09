import { useState } from "react";
import styles from "./BlogHistory.module.css";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "react-query";
import { deleteBlog, getBloggerBlog } from "../../../../constants/Api";

const BlogHistory = () => {
  const [top, setTop] = useState("topLeft");
  const [bottom, setBottom] = useState("bottomRight");

  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  //--------FETCH HOTEL INFO-------------
  const { data: BlogInfo } = useQuery("blog-details", () =>
    getBloggerBlog(token)
  );

  console.log(BlogInfo, "hotelinfo");

  const blogId = BlogInfo?.data[0]?.id;
  console.log(blogId, "hotelid");

  const tableData = BlogInfo?.data;

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlog(blogId, token);
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
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Create Date",
      dataIndex: "createdDate",
      key: "createdDate",
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
        <div>
          <Table
            columns={columns}
            pagination={{
              position: [bottom],
            }}
            dataSource={tableData}
            rowKey={"id"}
          />
        </div>
      </div>
    </>
  );
};
export default BlogHistory;
