import { Fragment, useState } from "react";
import "./ShowDisplay.css";
import ShowPic from "./ShowPic";
import ShowCard from "./ShowCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faGrip,
  faTableCellsLarge
} from "@fortawesome/free-solid-svg-icons";

const ShowDisplay = (props) => {
  let shows = props.shows;
  const [showSeq, setShowSeq] = useState(false);
  const [format, setFormat] = useState("grid");
  const [type, setType] = useState("All");

  if (!showSeq) {
    shows = shows.filter((show) => {
      return !show.relations.edges
        .map((relation) => relation["relationType"])
        .includes("PREQUEL");
    });
  }

  if (type === "Manga") {
    shows = shows.filter((show) => {
      return show.type === "MANGA";
    });
  } else if (type === "Anime") {
    shows = shows.filter((show) => {
      return show.type === "ANIME";
    });
  }

  const changeHandler = (e) => {
    setShowSeq(e.target.checked);
  };

  const loadShows = (e) => {
    props.seeMore();
  };

  const setCard = () => {
    setFormat("card");
  };

  const setGrid = () => {
    setFormat("grid");
  };

  const setList = () => {
    setFormat("list");
  };

  const switchHandler = (e) => {
    setType(e.target.innerText);
  };

  let myclass;
  let displayForm;

  if (format === "grid") {
    myclass = "show-display";
    displayForm = shows.map((show) => <ShowPic key={show.id} show={show} />);
  } else if (format === "card") {
    myclass = "show-display-card";
    displayForm = shows.map((show) => <ShowCard key={show.id} show={show} />);
  } else if (format === "list") {
  }

  return (
    <div className="show-area">
      <div className="top-row">
        <h1>Shows: {shows.length} results</h1>
        <div className="tabs">
          <button
            onClick={switchHandler}
            className={type === "All" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={switchHandler}
            className={type === "Manga" ? "active" : ""}
          >
            Manga
          </button>
          <button
            onClick={switchHandler}
            className={type === "Anime" ? "active" : ""}
          >
            Anime
          </button>
        </div>
      </div>

      <div className="show-filter">
        <div className="form-control">
          <label htmlFor="show_sequels">Show Sequels</label>
          <input
            type="checkbox"
            name="show_sequels"
            id="show_sequels"
            onChange={changeHandler}
            value={showSeq}
          />
        </div>
        <div className="btn-group">
          <button
            className={`icon-btn ${format === "grid" && "active"}`}
            id="grid"
            onClick={setGrid}
          >
            <FontAwesomeIcon icon={faGrip} size="1x" className="list-icon" />
          </button>
          <button
            className={`icon-btn ${format === "card" && "active"}`}
            id="card"
            onClick={setCard}
          >
            <FontAwesomeIcon
              icon={faTableCellsLarge}
              size="1x"
              className="list-icon"
            />
          </button>
        </div>
      </div>
      <div className={myclass}>
        {props.loading ? (
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          displayForm
        )}
      </div>
      {props.morePages ? (
        <div className="see-more">
          <button className="button" onClick={loadShows}>
            See More
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ShowDisplay;
