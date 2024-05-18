// import { useState } from "react";
// import styles from "./ChangePassword.module.css";
// import { IoIosLock } from "react-icons/io";
// import { useMutation } from "react-query";
// import { changePassword } from "../../../constants/Api";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const ChangePassword = () => {
//   const [changePasswordUser, setChangePasswordUser] = useState({
//     oldPassword: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const changePMutation = useMutation((data) => {
//     const token = localStorage.getItem("token");

//     changePassword(data, token)
//       .then((response) => {
//         console.log(response);
//         const message = response.data.message;
//         console.log(message);
//         setTimeout(() => {
//           toast.success(message);
//         }, 1000);
//       })
//       .catch((error) => {
//         console.log(error, "err");
//         console.log(error, "change error");
//         const errorMsg =
//           error.response.data.Password ||
//           error.response.data.OldPassword ||
//           error.response.data.ConfirmPassword ||
//           error.response.data.message;
//         if (Array.isArray(errorMsg)) {
//           errorMsg.forEach((err) => toast.error(err));
//         } else if (errorMsg) {
//           toast.error(errorMsg);
//         }
//       });
//   });

//   const handlePasswordChange = (event) => {
//     const { name, value } = event.target;
//     setChangePasswordUser({ ...changePasswordUser, [name]: value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     changePMutation.mutate(changePasswordUser);
//   };
//   return (
//     <>
//       <form action="" onSubmit={handleSubmit}>
//         <div className={styles.changepassword}>
//           <p>Change your password</p>
//           <div className={styles.inputfields}>
//             <span>
//               <label htmlFor="password">
//                 Current Passowrd <span style={{ color: "red" }}>*</span>
//                 <div className={styles.lockIcon}>
//                   <input
//                     type="text"
//                     id="password"
//                     name="oldPassword"
//                     className={styles.cpassword}
//                     onChange={handlePasswordChange}
//                     placeholder="Enter Current Password"
//                   />
//                   <span className={styles.icons}>
//                     <IoIosLock />
//                   </span>
//                 </div>
//               </label>
//               <hr />
//             </span>
//             <span>
//               <label htmlFor="password">
//                 New Password <span style={{ color: "red" }}>*</span>
//                 <div className={styles.lockIcon}>
//                   <input
//                     type="text"
//                     id="password"
//                     name="password"
//                     onChange={handlePasswordChange}
//                     placeholder="Enter new Password"
//                   />
//                   <span className={styles.icons}>
//                     <IoIosLock />
//                   </span>
//                 </div>
//               </label>
//               <hr />
//             </span>
//             <span>
//               <label htmlFor="password">
//                 Confirm Password <span style={{ color: "red" }}>*</span>
//                 <div className={styles.lockIcon}>
//                   <input
//                     type="text"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     onChange={handlePasswordChange}
//                     placeholder="Enter new Password"
//                   />
//                   <span className={styles.icons}>
//                     <IoIosLock />
//                   </span>
//                 </div>
//               </label>
//               <hr />
//             </span>
//           </div>
//           <span className={styles["psw-change"]}>
//             <button>Change Password</button>
//           </span>
//         </div>
//       </form>
//     </>
//   );
// };
// export default ChangePassword;

import { useState } from "react";
import styles from "./ChangePassword.module.css";
import { IoIosLock } from "react-icons/io";
import { useMutation } from "react-query";
import { changePassword } from "../../../constants/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChangePassword = () => {
  const [changePasswordUser, setChangePasswordUser] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const changePMutation = useMutation(
    (data) => {
      const token = localStorage.getItem("token");
      return changePassword(data, token);
    },
    {
      onSuccess: (response) => {
        const message = response.data.message;
        toast.success(message);
      },
      onError: (error) => {
        const errorMsg =
          error.response.data.Password ||
          error.response.data.OldPassword ||
          error.response.data.ConfirmPassword ||
          error.response.data.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      },
    }
  );

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setChangePasswordUser({ ...changePasswordUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePMutation.mutate(changePasswordUser);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className={styles.changepassword}>
          <p>Change your password</p>
          <div className={styles.inputfields}>
            <span>
              <label htmlFor="oldPassword">
                Current Password <span style={{ color: "red" }}>*</span>
                <div className={styles.lockIcon}>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    className={styles.cpassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter Current Password"
                  />
                  <span className={styles.icons}>
                    <IoIosLock />
                  </span>
                </div>
              </label>
              <hr />
            </span>
            <span>
              <label htmlFor="password">
                New Password <span style={{ color: "red" }}>*</span>
                <div className={styles.lockIcon}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlePasswordChange}
                    placeholder="Enter New Password"
                  />
                  <span className={styles.icons}>
                    <IoIosLock />
                  </span>
                </div>
              </label>
              <hr />
            </span>
            <span>
              <label htmlFor="confirmPassword">
                Confirm Password <span style={{ color: "red" }}>*</span>
                <div className={styles.lockIcon}>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handlePasswordChange}
                    placeholder="Confirm New Password"
                  />
                  <span className={styles.icons}>
                    <IoIosLock />
                  </span>
                </div>
              </label>
              <hr />
            </span>
          </div>
          <span className={styles["psw-change"]}>
            <button type="submit">Change Password</button>
          </span>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
