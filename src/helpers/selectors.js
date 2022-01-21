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