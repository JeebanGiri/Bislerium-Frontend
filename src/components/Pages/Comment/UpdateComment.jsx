import { Flex, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateComment } from "../../../constants/Api";

const { TextArea } = Input;

const UpdateComment = ({ commentId, refetchComments, handleUpdateComment }) => {
  const [commentData, setCommentData] = useState({
    content: "",
    Id: commentId,
  });

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setCommentData({ ...commentData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (commentData.content.trim() === "") {
      toast.warn("Comment should not be empty");
      return;
    }

    handleUpdateComment(commentId, commentData.content);
  };

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <Flex vertical gap={32}>
        <TextArea
          showCount
          maxLength={100}
          name="content"
          onChange={handleCommentChange}
          placeholder="leave your comment"
          style={{
            height: 120,
            resize: "none",
          }}
        />
      </Flex>
    </form>
  );
};
export default UpdateComment;
