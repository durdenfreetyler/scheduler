import classNames from "classnames";
import React from "react";
import "components/InterviewerListItem.scss";

// Renders an interviewer item, which includes an avatar image, the interviewer's name, and a selected state that is toggled by clicking the item, and applies a selected class to the item if it is selected.

function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;
