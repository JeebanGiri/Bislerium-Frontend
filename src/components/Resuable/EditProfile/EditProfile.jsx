import styles from "./EditProfile.module.css";
import ThreeDot from "../../../assets/Images/Profile/dot.png";
import ArrowImg from "../../../assets/Images/Profile/arrow.png";
import Profileimg from "../../../assets/Images/Profile/personalinf.png";
import { FaCamera, FaExchangeAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { useRef, useState } from "react";
import { userProfile } from "../../../constants/Api";
import { useQuery } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { UseOutsideClick } from "../../../utils/useOutSideClick";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const navigateTo = useNavigate();
  const jwt = localStorage.getItem("token");

  const { data } = useQuery("get-profile", () => userProfile(jwt));
  console.log(data);

  const outerRef = useRef();
  UseOutsideClick(() => setIsUpdateProfileOpen(false), outerRef);

  const toogleUpdateDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpdateProfileOpen(!isUpdateProfileOpen);
  };

  const gotToInfo = () => {
    navigateTo("/edit-profile");
  };

  const goToPassword = () => {
    navigateTo("/edit-profile/change-password");
  };

  return (
    <>
      {data ? (
        <div className={styles["profile-box"]}>
          <div className={styles.box1}>
            <div className={styles.profileinfo}>
              <div className={styles.profileimage}>
                <span>
                  {data.data.avatar ? (
                    <img
                      src={data.data.avatar}
                      alt="Profile Image"
                      height={100}
                      width={100}
                    />
                  ) : (
                    <div className={styles.pbox}>
                      <p>
                        {data.data.fullName.charAt(0).toUpperCase()}
                        {data.data.fullName.split(" ")[1]
                          ? data.data.fullName
                              .split(" ")[1]
                              .charAt(0)
                              .toUpperCase()
                          : ""}
                      </p>
                    </div>
                  )}
                </span>
                <span className={styles.names}>
                  <p>{data?.data.fullName}</p>
                  <p>{data?.data.email}</p>
                </span>
              </div>
              <span
                className={styles.actionsbtn}
                onClick={toogleUpdateDropdown}
              >
                <img
                  src={ThreeDot}
                  alt="Action Button"
                  className={styles.actions}
                />
              </span>
            </div>
            {isUpdateProfileOpen && (
              <div className={styles["openablebox"]} ref={outerRef}>
                <div className={styles["photo-update"]}>
                  <span>
                    <FaCamera />
                  </span>
                  <span className={styles.contents}>Change Photo</span>
                </div>
                <div className={styles["profile-update"]}>
                  <span>
                    <RiEdit2Fill />
                  </span>
                  <span className={styles.contents}>Update Profile</span>
                </div>
              </div>
            )}
            <hr />
            <div className={styles.dropdownitem}>
              <li className={styles.info}>
                <span className={styles.firstinfos}>
                  <span>
                    <img src={Profileimg} alt="Personal Information" />
                  </span>
                  <span className={styles.slidebar} onClick={gotToInfo}>
                    Personal Information
                  </span>
                </span>
                <span className={styles.secondinfos}>
                  <span className={styles.detailsarrow}>
                    <img src={ArrowImg} alt="Arrow" />
                  </span>
                </span>
              </li>
              <li className={styles.info}>
                <span className={styles.firstinfos} onClick={goToPassword}>
                  <span>
                    <FaExchangeAlt style={{ color: "skyblue" }} size={20} />
                  </span>
                  <span className={styles.slidebar}>Change Password</span>
                </span>
                <span className={styles.secondinfos}>
                  <span className={styles.detailsarrow}>
                    <img src={ArrowImg} alt="Arrow" />
                  </span>
                </span>
              </li>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default EditProfile;
