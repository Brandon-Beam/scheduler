import React, { useState, useEffect } from "react";
import Axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Axios.put(`/api/appointments/${id}`, { interview }).then(
      setState({ ...state, appointments })
    )
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id], interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointment)

    return Axios.delete(`/api/appointments/${id}`).then(
      setState({ ...state, appointments }))
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

  const interviewers = getInterviewersForDay(state, state.day)

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        /></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
