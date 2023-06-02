import "./Pages.css";
import Recommendations from "../components/search/Recommendations";
import ShowDisplay from "../components/search/ShowDisplay";
import { useState } from "react";
import useGraphql from "../hooks/useGraphql.js";
import useFetch from "../hooks/useFetch.js";

let configObj = {
  new_viewer: {
    popularity_greater: 50000,
    status_in: "FINISHED",
    averageScore_greater: 6,
    sort: "POPULARITY_DESC"
  },
  underrated: {
    popularity_lesser: 30000,
    status_in: "FINISHED",
    averageScore_greater: 80,
    endDate_lesser: 20200713,
    sort: "POPULARITY_DESC"
  },
  heartwarming: {
    popularity_lesser: 100000,
    genre_in: ["Comedy", "Slice Of Life"],
    genre_not_in: ["Horror", "Action", "Drama"],
    status_in: "FINISHED",
    averageScore_greater: 70,
    endDate_lesser: 20210713,
    sort: "POPULARITY_DESC",
    format_not_in: "[OVA,MUSIC]"
  },
  existential: {
    popularity_lesser: 200000,
    genre_in: ["Psychological"],
    genre_not_in: ["Slice Of Life", "Comedy"],
    status_in: "FINISHED",
    averageScore_greater: 75,
    endDate_lesser: 20210713,
    sort: "POPULARITY_DESC"
  },
  exciting: {
    popularity_lesser: 200000,
    genre_in: ["Horror", "Action"],
    genre_not_in: ["Slice Of Life", "Comedy"],
    status_in: "FINISHED",
    averageScore_greater: 65,
    endDate_greater: 20100713,
    sort: "POPULARITY_DESC"
  },
  good_recent: {
    popularity_greater: 10000,
    averageScore_greater: 73,
    endDate_greater: 20180713,
    status_in: "FINISHED",
    sort: "END_DATE_DESC"
  },
  cry: {
    popularity_lesser: 150000,
    genre_in: ["Drama"],
    genre_not_in: ["Sports", "Action"],
    tag_in: ["Tragedy"],
    tag_not_in: ["Shounen", "Cultivation"],
    averageScore_greater: 75,
    sort: "POPULARITY_DESC",
    format_not_in: "[OVA,ONA,MUSIC]"
  },
  school_rom: {
    popularity_lesser: 100000,
    genre_in: ["Romance"],
    genre_not_in: ["Horror", "Action", "Psychological"],
    tag_in: ["School"],
    tag_not_in: ["Shounen", "Cultivation", "Tragedy"],
    averageScore_greater: 65,
    sort: "POPULARITY_DESC",
    format_not_in: "[OVA,ONA,MUSIC]"
  }
};

const Search = (props) => {
  const [shows, setShows] = useState([]);
  const [picked, setPicked] = useState("");
  const [page, setPage] = useState([1, false]);

  const processData = (data) => {
    setShows(data.Page.media);
    setPage((oldPage) => [
      data.Page.pageInfo.currentPage + 1,
      data.Page.pageInfo.hasNextPage
    ]);
  };

  const newShows = (data) => {
    setPage((oldPage) => [
      data.Page.pageInfo.currentPage + 1,
      data.Page.pageInfo.hasNextPage
    ]);
    setShows((oldShows) => oldShows.concat(data.Page.media));
  };

  const constructQuery = useGraphql();
  const [error, loading, sendQuery] = useFetch(processData);
  const [errorNew, loadingNew, getNewShows] = useFetch(newShows);

  const showHandler = (selected) => {
    setPicked(selected);
    sendQuery("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: constructQuery(configObj[selected])
      })
    });
  };

  const searchHandler = (searchterm) => {
    sendQuery("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: constructQuery({ search: searchterm, sort: "POPULARITY_DESC" })
      })
    });
  };

  const seeMore = () => {
    getNewShows("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: constructQuery(configObj[picked], { page: page[0] })
      })
    });
  };

  return (
    <div className="search">
      <Recommendations
        showHandler={showHandler}
        searchHandler={searchHandler}
      />
      <ShowDisplay
        loading={loading}
        shows={shows}
        seeMore={seeMore}
        morePages={page[1]}
      />
    </div>
  );
};
export default Search;
