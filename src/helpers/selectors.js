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

