import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useState } from "react";
import styles from "./AddAdmin.module.css";
import ViewSubAdmin from "../ViewSubAdmin/ViewSubAdmin";

const AddAdmin = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let data = {
    fullName,
    email,
    password,
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(data);
  };
  return (
    <>
      <h1>View SubAdmin</h1>
      <Button
        className={styles.addButton}
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Create Admin
      </Button>
      <ViewSubAdmin />
      <Drawer
        className={styles.drawer}
        title="Create a new admin"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="full_name"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter full name",
                  },
                ]}
              >
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "please enter email",
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default AddAdmin;
