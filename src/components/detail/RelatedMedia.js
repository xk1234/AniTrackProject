import "./RelatedMedia.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import RelatedShow from "./RelatedShow";
const RelatedMedia = (props) => {
  return (
    <Fragment>
      <h2>Related Media</h2>
      {props.related?.nodes?.length ? (
        <div className="related-display">
          {props.related?.nodes?.map((rShow, i) => (
            <RelatedShow
              key={rShow.id}
              rShow={rShow}
              relation={props.related?.edges[i].relationType}
            />
          ))}
        </div>
      ) : (
        <p>Nothing Found :(</p>
      )}
    </Fragment>
  );
};
export default RelatedMedia;
