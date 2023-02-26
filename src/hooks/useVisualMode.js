import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

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

/*
 mode: 1
 history: [1]
 -> transtion(2)
 mode: 2 
 history: [1, 2]
 -> transition(3)
 mode: 3
 history: [1, 2, 3]
 -> back()
 mode: 2
 history: [1, 2]  
 */

// transition Empty to Create
// back Create to Empty
// transition Empty to Create
// transition Create to Saving
// transition Create to Show
// transition Show to Edit
// back Edit to Show
// transition Show to Confirm
// transition Confirm to Deleting
// transition Confirm to Empty
