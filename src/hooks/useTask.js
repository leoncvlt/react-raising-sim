import { useEffect, useState } from "react";

export const useTask = ({ rounds = 0, interval = 0, onTask, onDone }) => {
  const [running, setRunning] = useState(false);
  const [taskResults, setTaskResults] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);

  const startTask = () => setRunning(true);

  useEffect(() => {
    if (!running) {
      return;
    }
    if (currentRound < rounds) {
      const roundResult = onTask ? onTask(currentRound) : {};
      setTaskResults((prev) => [...prev, roundResult]);
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1);
      }, interval);
    } else {
      onDone && onDone(taskResults);
    }
  }, [currentRound, running]);

  return { running, currentRound, taskResults, startTask };
};
