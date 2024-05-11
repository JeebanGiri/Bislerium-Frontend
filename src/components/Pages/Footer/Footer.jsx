import styles from "./Footer.module.css";
import { FiTwitter } from "react-icons/fi";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer>
        <div className={styles["footer-page"]}>
          <div className={styles["footer-level"]}>
            <div className={styles.label1}>
              <span className={styles.info}>
                <b>Bislerium</b>
              </span>
              <p>
                Baslirium is a premier blogging platform dedicated to sharing
                captivating stories and insightful perspectives on a wide range
                of topics.
              </p>
            </div>
            <span className={styles.label2}>
              <b>Categories</b>
              <p>Technology</p>
              <p>Lifestyle</p>
              <p>Travel</p>
              <p>Food</p>
              <p>Entertainment</p>
            </span>
            <span className={styles.label3}>
              <b>Social</b>
              <p>
                <FiTwitter /> <SlSocialFacebook /> <FaInstagram />
                <SlSocialLinkedin />
              </p>
            </span>
            <span className={styles.label4}>
              <b>Legal</b>
              <p>Term of Service</p>
              <p>Privacy Policy</p>
              <p>Cookie Policy</p>
            </span>
          </div>
          <p
            className={styles.copyright}
          >{`Copyright © Bislerium Cafe ${year}`}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
