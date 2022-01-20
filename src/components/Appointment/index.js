import React from 'react';
import './styles.scss';

const Appointment = (props) => {
  const { time } = props;

  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : "No appointments"}
    </article>
  )
};

export default Appointment;
