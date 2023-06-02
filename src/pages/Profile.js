import "./Profile.css";
import { Link } from "react-router-dom";
import ShowPic from "../components/search/ShowPic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useGraphql from "../hooks/useGraphql";
import useFetch from "../hooks/useFetch";

const Profile = (props) => {
  const email = useSelector((state) => state.auth.email);
  const usernameRe = /(?<stuff>.*)@.*/;
  const username = email.match(usernameRe)?.groups.stuff;

  function getShowInfo(arr_of_shows, page) {
    const query = queryConstructor(
      { id_in: `[${arr_of_shows}]` },
      { page: page }
    );
    getShows("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    });
  }
  const [myshows, setMyshows] = useState([]);
  const showinfo = useSelector((state) => state.show.showinfo);

  const displayShows = (shows) => {
    const allshows = shows.Page?.media;

    if (shows.Page?.pageInfo?.hasNextPage) {
      getShowInfo(shows, shows.Page?.pageInfo?.currentPage + 1);
      setMyshows((oldshows) => allshows);
    } else {
      setMyshows((oldshows) => oldshows.concat(allshows));
    }
  };

  const isLoggedIn = useSelector((state) => state.auth.access_token);
  const user_email = useSelector((state) => state.auth.email);
  const queryConstructor = useGraphql();
  const [error, loading, getShows] = useFetch(displayShows);

  useEffect(() => {
    let allshows = [];
    for (let key in showinfo) {
      if (showinfo[key].favorite) {
        allshows.push(showinfo[key].anilist_id);
      }
    }
    getShowInfo(allshows, 1);
  }, [showinfo]);

  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-area">
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          alt=""
          className="profilepic"
        />
        <div className="profile-info">
          <p>
            Username:
            <br /> {username}
          </p>
          <p>
            Email: <br /> {email}
          </p>
        </div>
      </div>
      <h2>
        Favorites{" "}
        <FontAwesomeIcon icon={faStar} size="1x" className="list-icon" />
      </h2>
      <div className="profile-favorites">
        {myshows.map((show) => (
          <ShowPic show={show} key={show.id} />
        ))}
      </div>
    </div>
  );
};
export default Profile;
