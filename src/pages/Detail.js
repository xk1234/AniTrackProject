import { useParams } from "react-router";
import "./Pages.css";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import RelatedMedia from "../components/detail/RelatedMedia";
import UserFacts from "../components/detail/UserFacts";
import ShowDetails from "../components/detail/ShowDetails";
import useFetch from "../hooks/useFetch";
import Reviews from "../components/detail/Reviews";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const Detail = (props) => {
  const [showInfo, setShowInfo] = useState({});

  const processInfo = (data) => {
    const show = data.Media;
    show.title = show.title.english ?? show.title.romaji;
    show.startDate = `${months[show.startDate.month - 1]} ${
      show.startDate.year
    }`;
    show.endDate = `${months[show.endDate?.month - 1]} ${show.endDate.year}`;
    setShowInfo(show);
  };

  const params = useParams();
  const [error, loading, getShowInfo] = useFetch(processInfo);

  useEffect(() => {
    const url = "https://graphql.anilist.co/";
    const query = `{
      
      Media(id: ${params.mediaId}) {
        reviews {
          edges {
            node {
              id
              summary
              rating
              createdAt
              body
            }
          }
        }
        ...MediaInfo
        averageScore
        popularity
        relations {
          edges {
            relationType
          }
          nodes {
            ...MediaInfo
          }
        }
      }
    }
    
    fragment MediaInfo on Media {
      id
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
        large
      }
      type
      description
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      episodes
      chapters
      duration
      genres
      tags {
        name
      }
    }`;
    getShowInfo(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    });
  }, [params]);

  return (
    <Fragment>
      {loading ? (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <Fragment>
          <div className="all-show-info">
            <UserFacts
              showPic={showInfo.coverImage}
              title={showInfo.title}
              id={showInfo.id}
              num={Math.max(showInfo.episodes, showInfo.chapters)}
            />
            <div className="main-details">
              <ShowDetails show={showInfo} />
              <RelatedMedia related={showInfo.relations} />
            </div>
          </div>
          <Reviews
            reviews={showInfo.reviews?.edges?.map((review) => review.node)}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
export default Detail;
