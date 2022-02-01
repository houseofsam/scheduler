export function getAppointmentsForDay(state, day) {
  const apptArray = [];

  const filteredDays = state.days.filter(individualDay => individualDay.name === day);
  const apptIds = filteredDays.map(filteredDay => filteredDay.appointments)[0];
  
  // return empty array when days data is empty or when day not found
  if (state.days.length === 0 || filteredDays.length === 0) {
    return apptArray;
  }

  //iterate through appt ids for a selected day
  apptIds.forEach((id) => {
    for (let appt in state.appointments) {
      if (id === state.appointments[appt].id) {
        apptArray.push(state.appointments[id]);
      }
    }
  })

  return apptArray;
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
  const interviewerArray = [];

  const filteredDays = state.days.filter(individualDay => individualDay.name === day);
  const interviewerIDs = filteredDays.map(filteredDay => filteredDay.interviewers)[0];
  
  // return empty array when days data is empty or when day not found
  if (state.days.length === 0 || filteredDays.length === 0) {
    return interviewerArray;
  }

  interviewerIDs.forEach((id) => {
    for (let interviewer in state.interviewers) {
      if (id === state.interviewers[interviewer].id) {
        interviewerArray.push(state.interviewers[id]);
      }
    }
  })

  return interviewerArray;
}