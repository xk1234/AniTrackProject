import "./Navbar.css";
import { Fragment, useState } from "react";
import "./NavToggle";
import NavToggle from "./NavToggle";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { showMessage, hideMessage } from "../../app/messageSlice";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNav = () => {
    setActive((old) => !old);
  };

  const closeHandler = () => {
    setActive(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(
      showMessage({
        message: `Successfully logged out of ${email} account`,
        status: "success"
      })
    );
    setTimeout(() => {
      dispatch(hideMessage());
    }, 3000);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      {!isLoggedIn ? (
        <Link to="/search">
          <FontAwesomeIcon icon={faSearch} size="2x" className="list-icon" />
        </Link>
      ) : (
        ""
      )}
      {active ? <NavToggle setClosed={closeHandler} /> : ""}
      {isLoggedIn ? (
        <button
          onClick={toggleNav}
          className={
            active
              ? "hamburger hamburger--squeeze is-active"
              : "hamburger hamburger--squeeze"
          }
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      ) : (
        ""
      )}
      <a href="#" className="nav-brand"></a>
      {isLoggedIn ? (
        <button className="button nav-mobile" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <div className="nav-buttons">
          <Link
            to="/login"
            className="button nav-mobile"
            style={{ "--local": "var(--primary-100)" }}
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="button solid nav-mobile show-mobile"
            style={{ "--local": "var(--danger-100)" }}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
