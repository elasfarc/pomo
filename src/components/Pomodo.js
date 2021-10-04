import React from "react";
import { useTimer } from "../useTimer";
import PomodoSettings from "./PomodoSettings";
import useDidMountEffect from "../useDidMountEffect";

function formatTime(v) {
  return v.toLocaleString("en-us", { minimumIntegerDigits: 2 });
}
const extractMinutes = (time) => parseInt(time / 60, 10);
const extractSeconds = (time) => time % 60;

const pipe =
  (...funcs) =>
  (start) =>
    funcs.reduce((acc, func) => func(acc), start);

function pomodoReducer(state, action) {
  switch (action.type) {
    case "changeMood":
      return {
        ...state,
        completedTasks: state.isBreak
          ? state.completedTasks
          : state.completedTasks + 1,
        isBreak: !state.isBreak,
      };
    case "changeSettings":
      const { intervals, autoStart } = action.payload;
      return { ...state, intervals, autoStart };

    default:
      throw new Error("unknown pomodoReducer action type...");
  }
}

const Pomodo = ({ t1 = 25, t2 = 5, t3 = 15 }) => {
  const pomodoSettings = {
    isBreak: false,
    completedTasks: 0,
    intervals: { focus: t1, shortBreak: t2, longBreak: t3 },
    autoStart: false,
  };
  const [settings, dispatch] = React.useReducer(pomodoReducer, pomodoSettings);
  const { intervals, completedTasks, isBreak, autoStart } = settings;

  const {
    state: { duration, isRunning, isDone, isEverStarted },
    run,
    pause,
    restart,
    setDuration,
  } = useTimer({ duration: intervals.focus });

  useDidMountEffect(
    React.useCallback(() => {
      if (isDone) dispatch({ type: "changeMood" });
    }, [isDone])
  );

  useDidMountEffect(
    React.useCallback(() => {
      setDuration(
        !isBreak
          ? intervals.focus
          : completedTasks % 4 === 0
          ? intervals.longBreak
          : intervals.shortBreak
      );
      if (autoStart && isDone) run();
    }, [
      completedTasks,
      intervals.focus,
      intervals.longBreak,
      intervals.shortBreak,
      isBreak,
      isDone,
      run,
      setDuration,
      autoStart,
    ])
  );

  const minutes = pipe(extractMinutes, formatTime);
  const seconds = pipe(extractSeconds, formatTime);

  const changeSettings = React.useCallback((updatedSettings) => {
    dispatch({ type: "changeSettings", payload: updatedSettings });
  }, []);

  const handleStop = () => {
    if (isBreak) dispatch({ type: "changeMood" });
    restart();
  };

  return (
    <div className="container txt-center border-white">
      <div className="timer__display">
        <span>{minutes(duration)}</span>
        <span>:</span>
        <span>{seconds(duration)}</span>
      </div>
      <div className="timer__control">
        <button onClick={isRunning ? pause : run}>
          {!isEverStarted ? "START" : isRunning ? "PAUSE" : "CONTINUE"}
        </button>
        {isEverStarted || isBreak ? (
          <button onClick={handleStop}>
            {isBreak ? "Cancel Break" : "STOP"}
          </button>
        ) : null}
      </div>
      <div>{completedTasks}</div>
      <PomodoSettings
        settings={{ intervals, autoStart }}
        onSubmit={changeSettings}
      />
    </div>
  );
};
export default Pomodo;
