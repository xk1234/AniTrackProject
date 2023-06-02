import "./Reviews.css";
import { Fragment, useEffect } from "react";
import Review from "./Review";

const Reviews = (props) => {
  return (
    <Fragment>
      <h2>Reviews ({props.reviews?.length})</h2>
      <div className="review-container">
        {props.reviews?.map((review) => {
          return <Review key={review.id} review={review} />;
        })}
      </div>
    </Fragment>
  );
};
export default Reviews;
