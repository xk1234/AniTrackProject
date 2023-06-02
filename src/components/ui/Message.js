import "./Message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { showMessage, hideMessage } from "../../app/messageSlice";
import { Link } from "react-router-dom";

const Message = (props) => {
  const dispatch = useDispatch();
  const status = props.status;

  const closeMessage = () => {
    dispatch(hideMessage());
  };

  return (
    <div className={`message ${status}`}>
      <p>{props.message}</p>
      <FontAwesomeIcon
        icon={faXmark}
        size="xl"
        className="list-icon"
        onClick={closeMessage}
      />
      {props.link ? <Link to={props.link}></Link> : ""}
    </div>
  );
};
export default Message;
