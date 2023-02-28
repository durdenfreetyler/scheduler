import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(day, increaseSpots) {
    let dayIndex = -1;
    const dayToUpdate = state.days.find((item, index) => {
      if (day === item.name) {
        dayIndex = index;
      }
      return item;
    });
    if (!increaseSpots) {
      dayToUpdate.spots = dayToUpdate.spots - 1;
    } else {
      dayToUpdate.spots = dayToUpdate.spots + 1;
    }
    const days = state.days;
    days.splice(dayIndex, 1, dayToUpdate);
    return days;
  }

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
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state.day, false),
        });
        // console.log(response);
      });

    // console.log(id, interview);
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state.day, true),
        });
        console.log(response);
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
