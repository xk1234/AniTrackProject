import "./LoginDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMusic,
  faSmile,
  faComment
} from "@fortawesome/free-solid-svg-icons";

const LoginDetails = (props) => {
  return (
    <div className="login-details">
      <ul>
        <li>
          <FontAwesomeIcon icon={faVideo} size="2x" className="list-icon" />
          <p>Track Your Favorite Shows</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faComment} size="2x" className="list-icon" />
          <p>Find and track discussions across the web</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faSmile} size="2x" className="list-icon" />
          <p>Get instant recommendations</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faMusic} size="2x" className="list-icon" />
          <p>Browse and track your favourite songs</p>
        </li>
      </ul>
    </div>
  );
};
export default LoginDetails;
