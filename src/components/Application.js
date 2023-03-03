import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Header from "./Appointment/Header";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// Exports the Application component which uses state and functions from the useApplicationData hook to render a page with a DayList component, appointments list, and Appointment component, and passes in the necessary props for booking and cancelling interviews.

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();
  const interviewers = getInterviewersForDay(state, state.day);
  const appointmentDays = getAppointmentsForDay(state, state.day);
  const appointmentList = appointmentDays.map((appointment) => {
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
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        <Header time={props.time} />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
