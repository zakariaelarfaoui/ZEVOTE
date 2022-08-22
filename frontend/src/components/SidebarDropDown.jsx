import { useState } from "react";
import { Link } from "react-router-dom";

import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarLink({ faUserGroup, text, to, isOpen }) {
  const [display, setDisplay] = useState("none");

  const handelClick = () => {
    setDisplay(display === "none" ? "block" : "none");
  };
  return (
    <article className="dashboard__sidebar__body__dropdown">
      <div
        className="dashboard__sidebar__body__dropdown__title"
        onClick={handelClick}
      >
        <FontAwesomeIcon
          icon={faUserGroup}
          className="dashboard__sidebar__body__dropdown__icon fs-5"
        />
        <span style={{ display: isOpen ? "block" : "none" }} className={`ms-4`}>
          {text}
        </span>
        <FontAwesomeIcon
          icon={display === "none" ? faAngleRight : faAngleDown}
          className="ms-auto"
          style={{ display: isOpen ? "block" : "none" }}
        />
      </div>
      <ul
        className="dashboard__sidebar__body__dropdown__links"
        style={{ display: display }}
      >
        <li className="mb-3">
          <Link to={to}>All {to}</Link>
        </li>
        <li className="mb-3">
          <Link to={`${to}/create`}>Add {to}</Link>
        </li>
      </ul>
    </article>
  );
}

export default SidebarLink;
