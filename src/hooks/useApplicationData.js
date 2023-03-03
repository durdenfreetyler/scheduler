import { useState, useEffect } from "react";
import axios from "axios";

  // Returns the state and functions for updating the state.

export default function useApplicationData() {
  // Updates the state with the given day. useState initializes the state with default values for day, days, appointments, and interviewers.

  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Fetches data from API for days, appointments, and interviewers.

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Updates the number of spots available in a day based on the number of interviews booked.

  function updateSpots(state, appointments, appointmentId) {
    const dayObj = state.days.find((day) =>
      day.appointments.includes(appointmentId)
    );

    const appointmentsForDay = dayObj.appointments;
    let spots = 0;
    for (const appointmentId of appointmentsForDay) {
      const appointment = appointments[appointmentId];
      if (!appointment.interview) {
        spots++;
      }
    }

    const updatedDay = { ...dayObj, spots };
    const updatedDays = state.days.map((day) =>
      day.name === updatedDay.name ? updatedDay : day
    );

    return updatedDays;
  }

  // Updates the state by adding an interview and updating the spots available in a day.

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState((prev) => ({
          ...prev,
          appointments,
          days: updateSpots(prev, appointments, id),
        }));
      });
  }

  // Updates the state by removing an interview and updating the spots available in a day.

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => ({
        ...prev,
        appointments,
        days: updateSpots(prev, appointments, id),
      }));
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
