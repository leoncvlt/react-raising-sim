import { useEffect, useState } from "react";

export const useTask = ({ rounds = 0, interval = 0, onTask, onDone }) => {
  const [reducer, setReducer] = useState({});
  const [currentRound, setCurrentRound] = useState(-1);

  const startTask = () => setCurrentRound(0);

  useEffect(() => {
    if (currentRound < 0) return;

    if (currentRound < rounds) {
      onTask && onTask(reducer, currentRound);
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1);
      }, interval);
    } else {
      onDone && onDone(reducer);
    }
  }, [currentRound]);

  return { currentRound, startTask };
};
