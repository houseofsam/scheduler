import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // 2nd parameter indicates whether the appointment change was a cancellation or not
  function updateSpots(apptID, cancelAppt = false) {
    // get day object by appointment ID
    const selectedDay = state.days.filter(day => day.appointments.includes(apptID))[0];
    let count = selectedDay.spots;
    
    // if appt slot wasn't empty && if cancelAppt = false, action performed was an edit - no count update required
    if (state.appointments[apptID].interview !== null && !cancelAppt) {
      return state.days;
    }

    // adjust count depending on whether appt was cancelled or added
    cancelAppt ? count++ : count--;

    // copy days array, change spots count, return new days array
    const newDays = [ ...state.days ];
    newDays.find(newDay => newDay === selectedDay).spots = count;
    return newDays;
  }
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id); 

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prevState) => ({ ...prevState, appointments, days }));
      });
  }

  function cancelInterview(id) {
    let newApptObj = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: newApptObj };
    const days = updateSpots(id, true); // 2nd param = cancelAppt

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prevState) => ({ ...prevState, appointments, days }));
      });
  }


  return { state, setDay, bookInterview, cancelInterview };
}
