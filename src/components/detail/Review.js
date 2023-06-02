import "./Reviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import useMarkdown from "../../hooks/useMarkdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Review = (props) => {
  const [opened, setOpened] = useState(false);
  const [text, setText] = useState("");

  const toggleHandler = () => {
    setOpened((opened) => !opened);
  };

  const reviewtext = useMarkdown(props.review.body);

  return (
    <div className="review">
      <div className="review-top" onClick={toggleHandler}>
        <h5>{props.review.summary}</h5>
        {opened ? (
          <FontAwesomeIcon icon={faMinus} size="2x" className="list-icon" />
        ) : (
          <FontAwesomeIcon icon={faPlus} size="2x" className="list-icon" />
        )}
      </div>
      {opened ? (
        <div className="review-body">
          <ReactMarkdown children={reviewtext} rehypePlugins={[rehypeRaw]} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Review;
