export function getAppointmentsForDay(state, day) {
  const apptArray = [];

  const filteredDays = state.days.filter(individualDay => individualDay.name === day);
  const apptIds = filteredDays.map(filteredDay => filteredDay.appointments)[0];
  
  // return empty array when days data is empty
  if (state.days.length === 0) {
    return apptArray;
  }
  // return empty array when day not found
  if (filteredDays.length === 0) {
    return apptArray;
  }

  //iterate through appt ids for a selected day
  apptIds.forEach((id) => {
    // iterate through appointments object in state
    for (let appt in state.appointments) {
      // check if id matches with id
      if (id === state.appointments[appt].id) {
        apptArray.push(state.appointments[id])
      }
    }
  })

  return apptArray;
}

export function getInterview(state, appointmentInterview) {
  if (!appointmentInterview) {
    return null;
  }

  // get the ID of the interviewer from the interview object that's passed in
  const interviewerID = appointmentInterview.interviewer;
  // reassign the value of the interviewer from the passed in interviewer object with the actual interviewer object from state which is obtained using the ID above
  appointmentInterview.interviewer = state.interviewers[interviewerID.toString()]

  return appointmentInterview;
}