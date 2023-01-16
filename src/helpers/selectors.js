export function getAppointmentsForDay(state, day) {
  const appDay = state.days.filter(d => d.name === day)
  if (appDay[0]) {
    const result = []
    for (const app of appDay[0].appointments) {
      result.push(state.appointments[app])
    }
    return result
  } else {
    return appDay
  }
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null
  } else {
    const int = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
    return int
  }
};

export function getInterviewersForDay(state, day) {
  const appDay = state.days.filter(d => d.name === day)
  if (appDay[0]) {
    const result = []
    for (const app of appDay[0].interviewers) {
      result.push(state.interviewers[app])
    }
    return result
  } else {

    return appDay
  }
}