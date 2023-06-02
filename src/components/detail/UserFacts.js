import "./UserFacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCheck,
  faEye,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../../app/supabaseClient";
import { useDispatch } from "react-redux";
import { showMessage, hideMessage } from "../../app/messageSlice";

const UserFacts = (props) => {
  const showinfo = useSelector((state) => state.show.showinfo);
  const user_email = useSelector((state) => state.auth.email);
  let [progress, setProgress] = useState(-1);
  let [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.access_token);

  useEffect(() => {
    setProgress(showinfo["key" + props.id]?.progress);
    setFav(showinfo["key" + props.id]?.favorite);
  }, [showinfo, props.id]);

  let badge = (
    <div className="badge">
      <p>No Status</p>
    </div>
  );

  const incrementHandler = async () => {
    if (props.num >= progress) {
      setProgress((progress) => progress + 1);
      const { data, error } = await supabase
        .from("User Media Connection")
        .update({ progress: progress})
        .eq("user", user_email)
        .eq("anilist_id", props.id);
      if (data[0] && !error) {
        dispatch(
          showMessage({
            message: `Increased episode count to ${data[0].progress}`,
            status: "success"
          })
        );
        setTimeout(() => {
          dispatch(hideMessage());
        }, 1000);
      }
    }
  };

  const decrementHandler = async () => {
    if (progress > 0) {
      setProgress((progress) => progress - 1);
      const { data, error } = await supabase
        .from("User Media Connection")
        .update({ progress: progress })
        .eq("user", user_email)
        .eq("anilist_id", props.id);
      if (data[0] && !error) {
        dispatch(
          showMessage({
            message: `Decreased episode count by 1 to ${progress}`,
            status: "success"
          })
        );
        setTimeout(() => {
          dispatch(hideMessage());
        }, 1000);
      }
    }
  };

  const addPTW = async () => {
    setProgress(0);
    const { data, error } = await supabase
      .from("User Media Connection")
      .insert([{ progress: 0, anilist_id: props.id, user: user_email }]);
    if (data[0] && !error) {
      dispatch(
        showMessage({
          message: `Added ${props.title} to watchlist`,
          status: "success"
        })
      );
      setTimeout(() => {
        dispatch(hideMessage());
      }, 1000);
    }
  };

  const markComplete = async () => {
    setProgress(props.num + 1);
    const { data, error } = await supabase
      .from("User Media Connection")
      .insert([
        { progress: props.num + 1, anilist_id: props.id, user: user_email }
      ]);
    if (data[0] && !error) {
      dispatch(
        showMessage({
          message: `Marked ${props.title} as complete`,
          status: "success"
        })
      );
      setTimeout(() => {
        dispatch(hideMessage());
      }, 1000);
    }
  };

  const toggleFav = async () => {
    setFav((fav) => !fav);
    const { data, error } = await supabase
      .from("User Media Connection")
      .update({ favorite: !fav })
      .eq("user", user_email)
      .eq("anilist_id", props.id);

    let message;
    let status;
    if (!fav) {
      message = `Marked ${props.title} as favorite`;
      status = "success";
    } else {
      message = `Removed ${props.title} from favorites`;
      status = "error";
    }

    dispatch(
      showMessage({
        message: message,
        status: status
      })
    );
    setTimeout(() => {
      dispatch(hideMessage());
    }, 1000);
  };

  let progresschange = "";

  if (user_email) {
    progresschange = (
      <div className="start-show">
        <button onClick={addPTW}>Add Plan To Watch</button>
        <button onClick={markComplete}>Mark As Complete</button>
      </div>
    );
  }

  if (progress >= 0) {
    if (progress > props.num) {
      progresschange = "";
    } else {
      progresschange = (
        <div className="setprogress">
          <button onClick={decrementHandler}>
            <FontAwesomeIcon icon={faMinus} size="1x" className="list-icon" />
          </button>
          <p>Change Progress</p>
          <button onClick={incrementHandler}>
            <FontAwesomeIcon icon={faPlus} size="1x" className="list-icon" />
          </button>
        </div>
      );
    }
    if (progress > props.num && props.num !== 0) {
      //status completed
      badge = (
        <div className="badge success">
          <p>
            <FontAwesomeIcon icon={faCheck} size="1x" className="list-icon" />{" "}
            Completed
          </p>
        </div>
      );
    } else if (props.num >= progress && progress > 0) {
      badge = (
        <div className="badge watching">
          <p>
            <FontAwesomeIcon icon={faEye} size="1x" className="list-icon" />{" "}
            Watching {progress}/{props.num}
          </p>
        </div>
      );
    } else if (progress === 0) {
      badge = (
        <div className="badge primary">
          <p>Plan To Watch</p>
        </div>
      );
    } else {
      badge = (
        <div className="badge">
          <p>Progress: {progress}</p>
        </div>
      );
    }
  }

  return (
    <div className="user-facts">
      <h1 className="desktop-hidden">{props.title}</h1>
      <img src={props.showPic?.extraLarge} alt={props.title} />
      {progresschange}
      {badge}
      {isLoggedIn ? (
        <button
          className={fav ? "favorites solid" : "favorites"}
          onClick={toggleFav}
        >
          <FontAwesomeIcon icon={faHeart} size="1x" className="list-icon" />
          {fav ? "Remove" : "Add To"} Favorite
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
export default UserFacts;
