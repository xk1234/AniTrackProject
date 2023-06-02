import "./RelatedMedia.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
const RelatedShow = (props) => {
  let title = props.rShow?.title?.english ?? props.rShow?.title?.romaji;
  return (
    <div className="related-show">
      <img src={props.rShow.coverImage.extraLarge} alt={title} />
      <div className="details">
        <p>{title}</p>
        <p>({props.relation})</p>
      </div>
      <Link to={`/detail/${props.rShow.id}`}></Link>
    </div>
  );
};
export default RelatedShow;
