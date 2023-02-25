import React from "react";
import DayListItem from "./DayListItem"


export default function DayList(props) {
    const dayListItems = props.days.map((day) => { return (
      <DayListItem
        name={day.name}
        setDay={props.onChange}
        spots={day.spots}
        selected={props.value === day.name}
        key={day.id}
      />
    ); })


    return (
      <ul>
      {dayListItems}
      </ul>
    );

}