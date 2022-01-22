import { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    
    // for situations where 2 transitions are required & back action returns to initial state
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
    
    setHistory((prevHistory) => ([...prevHistory, newMode]));
  };

  const back = () => {
    // do not allow user to go back past initial mode
    if (history.length === 1) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  useEffect(() => {
    // set mode to the last item of history array when history array changes
    setMode(history.slice(-1)[0]);
  }, [history]);

  return{ mode, transition, back, history };
};