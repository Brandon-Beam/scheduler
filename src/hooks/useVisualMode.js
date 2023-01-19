import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //handles mode transition and maintains mode history
  function transition(second, opt) {
    if (opt === true) {
      history.pop()
      setHistory(prev => [...prev, mode])
      setMode(second)
    } else {
      history.push(second)
      setMode(second)
    }
  };
  //reverts mode back if able
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1])
    };
  };
  return { mode, transition, back };
};


