import React from "react";
import { useTimer } from "./useTimer";

const usePomodo = ({ t1=25*60, t2=5*60, t3=15*60 }) => {
  const [counter, setCounter] = React.useState(0);
  const breakRef = React.useRef(false);
  const pomodoSettingsRef = React.useRef({
    focus: t1,
    shortBreak: t2,
    longBreak: t3,
  });
  const { focus, shortBreak, longBreak } = pomodoSettingsRef.current;
  const changePomodoSettings = (newSettings) => {
    pomodoSettingsRef.current = {
      ...pomodoSettingsRef.current,
      ...newSettings,
    };
    if (newSettings?.focus) setDuration(newSettings.focus);
  };
  const timerState = useTimer({ duration: focus });
  const {
    state: { isDone },
    setDuration,
  } = timerState;

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

  return { ...timerState, counter, changePomodoSettings };
};

export { usePomodo };
