import "./ShowDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faBook,
  faClock,
  faVideo,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

const ShowDetails = (props) => {
  let show = props.show;

  return (
    <div className="key-facts">
      <h1 className="desktop-show">{show.title}</h1>
      <p className="genres">Genres: {show.genres?.join(", ")}</p>
      <div className="facts-badge">
        <span className="badge">
          <FontAwesomeIcon icon={faCalendar} size="1x" className="list-icon" />{" "}
          {show.startDate} - {show.endDate}
        </span>
        {show.chapters ? (
          <span className="badge">
            <FontAwesomeIcon icon={faBook} size="1x" className="list-icon" />{" "}
            {show.chapters} chapters
          </span>
        ) : (
          ""
        )}
        {show.episodes ? (
          <span className="badge">
            <FontAwesomeIcon icon={faVideo} size="1x" className="list-icon" />{" "}
            {show.episodes} episodes
          </span>
        ) : (
          ""
        )}
        {show.duration ? (
          <span className="badge">
            <FontAwesomeIcon icon={faClock} size="1x" className="list-icon" />{" "}
            {show.duration} min/ep
          </span>
        ) : (
          ""
        )}
        {show.averageScore ? (
          <span className="badge">
            <FontAwesomeIcon icon={faStar} size="1x" className="list-icon" />{" "}
            {show.averageScore}
          </span>
        ) : (
          ""
        )}
      </div>
      <p>{ReactHtmlParser(show.description)}</p>
    </div>
  );
};
export default ShowDetails;
