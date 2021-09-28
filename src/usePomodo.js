import React from "react";
import { useTimer } from "./useTimer";

const usePomodo = ({ focus = 25, shortBreak = 5, longBreak = 15 }) => {
  const timerState = useTimer({ duration: focus });
  const {
    state: { isDone },
    setDuration,
  } = timerState;

  const [counter, setCounter] = React.useState(0);
  const breakRef = React.useRef(false);

  React.useEffect(() => {
    if (!isDone) return;
    breakRef.current = !breakRef.current;
    const { current: isBreak } = breakRef;

    if (isBreak) {
      setCounter((prevCounter) => {
        const updatedCounter = prevCounter + 1;
        setDuration(updatedCounter % 4 === 0 ? longBreak : shortBreak);
        return updatedCounter;
      });
    } else setDuration(focus);
  }, [counter, focus, isDone, longBreak, setDuration, shortBreak]);

  return { ...timerState, counter };
};

export { usePomodo };
