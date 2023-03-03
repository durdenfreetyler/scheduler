import { useState } from "react";

// Create a state with the initial mode and history of modes, and it returns an object with the current mode and functions to transition to a new mode or go back to the previous mode.

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Takes a newMode argument and updates the mode state to the new mode. It also updates the history state by adding the new mode to the end of the array unless the replace argument is true, in which case it replaces the last element in the history array with the new mode.

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory((prev) => {
      if (replace) {
        const newHistory = [...prev.slice(0, -1), newMode];
        return newHistory;
      } else {
        const newHistory = [...prev, newMode];
        return newHistory;
      }
    });
  }

  // Updates the mode state and history state to the previous mode in the history array unless there is only one item in the array, in which case it does nothing.

  function back() {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, -1)];
      const newMode = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setMode(newMode);
    }
  }

  return { mode, transition, back };
}
