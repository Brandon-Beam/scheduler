import { useState, useEffect } from "react";
import axios from "axios";
//manages data for application
export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });
  //books interview updates relevent spots
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
        //filters days array by name inside day object, then creates an array of appointments from day object.
        //followed by looping through appointments array to check if corresponding appointment is null. if it is updates counter. 
        //uses spotsUpdate counter to update spots left
        const day = state.days.filter(id => id.name.includes(state.day))
        const appArray = day[0].appointments
        let spotsUpdate = 0
        for (const app of appArray) {
          if (appointments[app].interview === null) {
            spotsUpdate = spotsUpdate + 1
          }
        }
        day[0].spots = spotsUpdate
        setState({ ...state, appointments, ...state.days })
      })
  };
  //deletes interview and removes a spot
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
  };

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });
  //gets data from server and updates state
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
};