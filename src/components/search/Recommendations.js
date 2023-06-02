import "./Recommendations.css";
import useGraphql from "../../hooks/useGraphql.js";
import useFetch from "../../hooks/useFetch.js";
import { useRef } from "react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Recommendations = (props) => {
  const selectedRef = useRef();
  const searchRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    //build request
    const selected = selectedRef.current.value;
    props.showHandler(selected);
  };

  const findHandler = () => {
    props.searchHandler(searchRef.current.value);
  };

  return (
    <div className="find-shows">
      <h1>Find Shows</h1>
      <div className="searchrow">
        <div className="input-group-append">
          <input
            ref={searchRef}
            type="text"
            className="searchbox"
            placeholder="Enter show name"
          />
          <button onClick={findHandler}>
            <FontAwesomeIcon icon={faSearch} size="1x" className="list-icon" />
          </button>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="form-inputs">
          <div className="form-control">
            <label htmlFor="main">One Click Recommendations</label>
            <select name="main" id="main" ref={selectedRef}>
              <option value="new_viewer">I'm New To Anime & Manga</option>
              <option value="underrated">
                Looking for something underrated
              </option>
              <option value="heartwarming">
                I want something to take my mind off the stresses of daily life
              </option>
              <option value="existential">
                I’m bored and want something that truly breaks the mold and make
                me ponder my existence
              </option>
              <option value="exciting">
                I want something exciting that keeps me at the edge of my seat
              </option>
              <option value="good_recent">
                I want to watch a good and recent show
              </option>
              <option value="cry">
                I want something sad that allows me to have a good cry
              </option>
              <option value="school_rom">
                I want a school romance to relax and laugh about
              </option>
            </select>
          </div>
        </div>
        <button className="submit-btn">Get Recommendations</button>
      </form>
    </div>
  );
};
export default Recommendations;
