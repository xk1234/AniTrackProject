import "./ShowPic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ShowPic = (props) => {
  const show = props.show;

  return (
    <div className="show-pic">
      <img src={show.coverImage.large} />
      <div className="show-icon">
        <FontAwesomeIcon
          icon={show.type === "ANIME" ? faVideo : faBook}
          size="xl"
          className="list-icon"
        />
      </div>
      <Link to={`/detail/${show.id}`}></Link>
      <div className="title">
        <p>{show.title.english ?? show.title.romaji}</p>
      </div>
    </div>
  );
};

export default ShowPic;
