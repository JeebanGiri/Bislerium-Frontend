import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import style from "./HomeNavigation.module.css";

const HomeNavigation = () => {
  const navItems = [
    { path: "/", name: "Homes" },
    { path: "/register", name: "Register" },
    { path: "/login", name: "Login" },
  ];

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const location = useLocation();

  return (
    <nav className={style.homeNavigation}>
      <div className={style.navbarWrapper}>
        <span className={style.logos}>
          <li to="/" className={style.logobox}>
            Bislerium Blog Site
          </li>
        </span>
        <span className={style.navItemsWrapper}>
          <ol
            className={
              click ? `${style.navMenu} ${style.active}` : style.navMenu
            }
          >
            {navItems.map((item, index) => (
              <li key={index} className={style.navigationItem}>
                <NavLink
                  to={item.path}
                  exact="true"
                  className={`${style.navLink} ${
                    item.path === location.pathname ? style.active : ""
                  }`}
                  onClick={handleClick}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ol>
        </span>
        <div className={style.menuIconWrapper} onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default HomeNavigation;
