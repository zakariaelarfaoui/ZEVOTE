import { StyledNotification } from "./Notification.styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const Notification = ({ type, message, setAlert,}) => {
  // setTimeout(() => {
  //   setAlert({ show: false, message: "", role: ""});
  // }, 5000);

  let style = {};
  if (type === "success") {
    style = {
      notification: {
        display: "block",
        backgroundColor: "#7ece7e",
        borderLeft: "8px solid #147514",
      },
      icon: faCircleCheck,
      iconColor: "#036803",
    };
  } else if (type === "warning") {
    style = {
      notification: {
        display: "block",
        backgroundColor: "#ffdb9b",
        borderLeft: "8px solid #ffa502",
      },
      icon: faExclamationCircle,
      iconColor: "#ce8500",
    };
  } else if (type === "error") {
    style = {
      notification: {
        display: "block",
        backgroundColor: "#f6a698",
        borderLeft: "8px solid #f84f31",
      },
      icon: faCircleCheck,
      iconColor: "#a63724",
    };
  }

  return (
    <StyledNotification
      className={`notification--${type}`}
      style={style.notification}
    >
      <FontAwesomeIcon
        icon={style.icon}
        color={style.iconColor}
        className="notification__icon"
      />
      <span
        style={style.msg}
        className={`notification__msg ${
          type === "success"
            ? "notification__msg--success"
            : type === "error"
            ? "notification__msg--error"
            : "notification__msg--warning"
        }`}
      >
        {message}
      </span>
      <div
        className={`notification__close-btn ${
          type === "success"
            ? "notification__close-btn--success"
            : type === "error"
            ? "notification__close-btn--error"
            : "notification__close-btn--warning"
        }`}
        style={style.closeButton}
        onClick={(e) => setAlert({ show: false })}
      >
        <FontAwesomeIcon
          icon={faTimes}
          color={style.iconColor}
          className="notification__close-btn__icon"
        />
      </div>
    </StyledNotification>
  );
};

export default Notification;
