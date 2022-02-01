export function getAppointmentsForDay(state, day) {
  // find the day passed in as the 2nd argument in the selector function
  const findDay = state.days.find(individualDay => individualDay.name === day);

  // return empty array when days data is empty or when day not found
  if (state.days.length === 0 || !findDay) {
    return [];
  }

  // return array of appointment objects for the selected day
  return findDay.appointments.map(id => state.appointments[id])
}

export function getInterview(state, appointmentInterview) {
  if (!appointmentInterview) {
    return null;
  }

  /*
  create and return new obj to fix bug causing the interviewer object prop to not persist and return undefined upon component revisit.
  Initially manipulated the appointmentInterview object being passed in which I figured was the problem
  */
  const newInterviewObj = { ...appointmentInterview }

  // get the ID of the interviewer from the interview object that's passed in
  const interviewerID = appointmentInterview.interviewer;
  // reassign the value of the interviewer from the passed in interviewer object with the actual interviewer object from state which is obtained using the ID above
  newInterviewObj.interviewer = state.interviewers[`${interviewerID}`];

  return newInterviewObj;
}

export function getInterviewersForDay(state, day) {
  const findDay = state.days.find(individualDay => individualDay.name === day);
  
  // return empty array when days data is empty or when day not found
  if (state.days.length === 0 || !findDay) {
    return [];
  }

  // return array of interviewer objects that match interviewer IDs in selected day
  return findDay.interviewers.map(id => state.interviewers[id]);
}