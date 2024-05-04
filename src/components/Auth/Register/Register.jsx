import { useState } from "react";
import styles from "./Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerBolgger } from "../../../constants/Api";

const Register = () => {
  const navigateTo = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // // Check if password not match
  // if (data.password !== data.confirmPassword) {
  //   toast.error("The password and confirmation password do not match.");
  // }

  // // Check if full name is provided
  // if (!data.fullName) {
  //   toast.error("Full name is required.");
  // }

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   const registerData = { ...data, role: "Blogger" };

  //   localStorage.setItem("Email", registerData.email);

  //   registerBolgger(registerData)
  //     .then((response) => {
  //       const message = response.data;
  //       toast.success(message);
  //       setTimeout(() => {
  //         navigateTo("/login");
  //       }, 2000);
  //     })
  //     .catch((error) => {
  //       console.log(error.response, "errors");

  //       const errorMsg =
  //         error.response.data.message || error.response.data.error.message;
  //       toast.error(errorMsg);

  //       if (Array.isArray(errorMsg)) {
  //         errorMsg.forEach((err) => toast.error(err));
  //       } else if (errorMsg) {
  //         toast.error(errorMsg);
  //       }
  //     });
  // };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerData = { ...data, role: "Blogger" };

    localStorage.setItem("Email", registerData.email);

    registerBolgger(registerData)
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
      <div className={styles.registerform}>
        <div className={styles.registercontainer}>
          <div className={styles.header}>
            <h4>Register</h4>
            <p>Enter your credentials to create an account</p>
          </div>
          <form onSubmit={handleRegister}>
            <div className={styles.inputitem}>
              <div className={styles["input-label2"]}>
                <div className={styles["input-name"]}>
                  <label htmlFor="fullName">Full Name</label> <br />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    // required
                  />
                </div>
                <div className={styles["input-email"]}>
                  <label htmlFor="email">Email</label> <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles["input-password"]}>
                  <label htmlFor="password">Password</label> <br />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles["input-password"]}>
                  <label htmlFor="confirm-password">Confirm Password</label>{" "}
                  <br />
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles["input-role"]}>
                  <label htmlFor="roles">Role</label> <br />
                  <input
                    type="text"
                    id="roles"
                    name="role"
                    value="Blogger"
                    onChange={handleInputChange}
                    readOnly
                    required
                  />
                </div>
                <div className={styles.btn}>
                  <button type="submit">Register</button>
                </div>
              </div>

              <div className={styles.footer}>
                <p>
                  Already have an account?{" "}
                  <NavLink to="/login">
                    <span className={styles.gologin}>Log In</span>
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
