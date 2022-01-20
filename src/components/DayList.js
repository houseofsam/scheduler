import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const DayListItems = props.days.map((day) => 
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  );

  return (
    <ul>{DayListItems}</ul>
  )
}

export default DayList
