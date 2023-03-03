import classNames from "classnames";
import "components/DayListItem.scss";
import React from "react";

// Exports a function that returns a component for displaying a day item in a list, where the spots available for appointments for that day are formatted and rendered along with the name of the day, and the item's CSS class depends on whether it's selected or fully booked.

export default function DayListItem(props) {

  function formatSpots(spots) {

    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  }

  const dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
