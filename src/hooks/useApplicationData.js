import React, { useState, useEffect } from "react";
import axios from "axios";

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
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const day = state.days.filter(id => id.name.includes(state.day))
        const appArray = day[0].appointments
        let spotsUpdate = 0
        for (const app of appArray) {
          if (appointments[app].interview === null) {
            spotsUpdate = spotsUpdate + 1
            console.log(spotsUpdate)
          }
        }
        day[0].spots = spotsUpdate
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
    return axios.delete(`/api/appointments/${id}`)
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
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all => {
      setState({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    }))
  }, []);
  return { state, setDay, bookInterview, cancelInterview }
}