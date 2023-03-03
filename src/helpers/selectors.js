// Takes the state and a day as input, and returns an array of appointments for that day from the state object.

export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map(
    (id) => state.appointments[id]
  );

  return appointments;
}
// Takes the state and an interview object as input, and returns an object containing the student name and an interviewer object with their id, name, and avatar.

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };
}

// Takes the state and a day as input, and returns an array of interviewers available on that day from the state object.

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay || state.days.length === 0) {
    return [];
  }

  const interviewers = selectedDay.interviewers.map(
    (id) => state.interviewers[id]
  );
  return interviewers;
}
