import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const day = state.days.filter(id => id.name.includes(state.day))
        day[0].spots = (day[0].spots - 1)
        setState({ ...state, appointments, ...state.days })
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id], interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const day = state.days.filter(id => id.name.includes(state.day))
        day[0].spots = (day[0].spots + 1)
        setState({ ...state, appointments, ...state.days })
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ]).then((all => {
      setState({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    }))
  }, []);
  return { state, setDay, bookInterview, cancelInterview }
}