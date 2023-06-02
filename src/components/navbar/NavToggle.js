import "./NavToggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faChartArea,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavToggle = (props) => {
  const closeNavbar = () => {
    props.setClosed();
  };

  return (
    <div className="nav-toggle">
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "activelink" : undefined)}
            onClick={closeNavbar}
          >
            {" "}
            <FontAwesomeIcon icon={faHome} size="xl" className="list-icon" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "activelink" : undefined)}
            onClick={closeNavbar}
          >
            <FontAwesomeIcon icon={faSearch} size="xl" className="list-icon" />
            Find A Show
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "activelink" : undefined)}
            onClick={closeNavbar}
          >
            <FontAwesomeIcon icon={faUser} size="xl" className="list-icon" />
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default NavToggle;
