import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useState } from "react";
import styles from "./AddAdmin.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewSubAdmin from "../ViewSubAdmin/ViewSubAdmin";
import { registerSubAdmin } from "../../../../constants/Api";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const navigateTo = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let data = {
    fullName,
    email,
    password,
    confirmPassword,
    // role: "Admin",
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerData = { ...data, role: "Admin" };

    localStorage.setItem("Email", registerData.email);

    registerSubAdmin(registerData)
      .then((response) => {
        if (response.status === 200) {
          const message = response.data;
          toast.success(message);
          setTimeout(() => {
            navigateTo("/login");
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
        console.error("Error:", error);
        console.log(error.response.data.errors.ConfirmPassword);
        const errorMsg =
          error.response.data.message ||
          error.response.data.errors.FullName ||
          error.response.data.errors.ConfirmPassword ||
          error.response.data.errors;

        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
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
            <Button onClick={handleRegister} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          className={styles.form}
          onSubmit={handleRegister}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="Comfirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
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
