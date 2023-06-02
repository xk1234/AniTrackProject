import { Fragment, useEffect } from "react";
import ShowList from "../components/dashboard/ShowList";
import StatsBox from "../components/dashboard/StatsBox";
import Activity from "../components/dashboard/Activity";
import "./Pages.css";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../app/supabaseClient";
import useGraphql from "../hooks/useGraphql";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { setShowInfo } from "../app/showSlice";

const Dashboard = (props) => {
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
  let arr_shows = [];
  const [myshows, setMyshows] = useState([]);
  let progresslist = {};
  const dispatch = useDispatch();

  const displayShows = (shows) => {
    console.log(shows);
    const allshows = shows.Page?.media;

    if (shows.Page?.pageInfo?.hasNextPage) {
      getShowInfo(arr_shows, shows.Page?.pageInfo?.currentPage + 1);
    }
    setMyshows((oldshows) => oldshows.concat(allshows));
  };

  const isLoggedIn = useSelector((state) => state.auth.access_token);
  const user_email = useSelector((state) => state.auth.email);
  const queryConstructor = useGraphql();
  const [error, loading, getShows] = useFetch(displayShows);

  useEffect(() => {
    async function getUserShows() {
        let { data, error } = await supabase
        .from('User Media Connection')
        .select('*')
        .eq("user", user_email);

        if (data && !error) {
        arr_shows = data.map((connection) => connection.anilist_id);
        getShowInfo(arr_shows, 1);
        data.forEach((userinfo) => {
          progresslist["key" + userinfo.anilist_id] = {
            anilist_id: userinfo.anilist_id,
            progress: userinfo.progress,
            favorite: userinfo.favorite
          };
        });
        dispatch(
          setShowInfo({
            showinfo: progresslist
          })
        );
      }
    }

    if (isLoggedIn) {
      getUserShows();
    }
  }, [isLoggedIn]);

  return (
    <div className="dashboard">
      <ShowList shows={myshows} />
      <div className="info">
        <StatsBox myshows={myshows} />
        <Activity />
      </div>
    </div>
  );
};
export default Dashboard;
