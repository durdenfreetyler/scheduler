import React from "react";
import DayListItem from "./DayListItem";

// Creates a list of DayListItem components using an array of day objects passed in through props, and sets the selected day to be highlighted.

export default function DayList(props) {

  const dayListItems = props.days.map((day) => {

    return (
      <DayListItem
        name={day.name}
        setDay={props.onChange}
        spots={day.spots}
        selected={props.value === day.name}
        key={day.id}
      />
    );

  });

  return <ul>{dayListItems}</ul>;

}
