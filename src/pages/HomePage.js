import "./Pages.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HomePage = (props) => {
  return (
    <div className="homepage">
      <div className="homepage-left">
        <h1>Track and discover new shows</h1>
        <div className="call-to-action">
          <Link to="/search" className="button">
            <FontAwesomeIcon icon={faSearch} size="1x" className="list-icon" />
            Find A Show
          </Link>
          <Link to="/sign-up" className="button">
            Sign Up, Its Free!
          </Link>
        </div>
      </div>
      <div className="homepage-right">
        <div className="homepage-images">
          <img
            src="https://images.unsplash.com/photo-1658128234026-77c9d8047e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1657692310479-48b1dd077231?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1657650976741-ee0cb25af5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
