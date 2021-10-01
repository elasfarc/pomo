import React from "react";
import { useTimer } from "./useTimer";

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

    default:
      throw new Error("unknown pomodoReducer action type...");
  }
}

const Pomodo = ({ t1 = 25, t2 = 5, t3 = 15 }) => {
  const pomodoSettings = {
    isBreak: false,
    completedTasks: 0,
    intervals: { focus: t1, shortBreak: t2, longBreak: t3 },
  };
  const [settings, dispatch] = React.useReducer(pomodoReducer, pomodoSettings);

  const { intervals, completedTasks, isBreak } = settings;
  const {
    state: { duration, isRunning, isDone },
    operate,
    restart,
    setDuration,
  } = useTimer({ duration: intervals.focus });
  const minutes = pipe(extractMinutes, formatTime);
  const seconds = pipe(extractSeconds, formatTime);

  React.useEffect(() => {
    if (isDone) dispatch({ type: "changeMood" });
  }, [isDone]);
  React.useEffect(() => {
    console.log(":(((((( :* :((((((");
    setDuration(
      !isBreak
        ? intervals.focus
        : completedTasks % 4 === 0
        ? intervals.longBreak
        : intervals.shortBreak
    );
  }, [
    completedTasks,
    intervals.focus,
    intervals.longBreak,
    intervals.shortBreak,
    isBreak,
    setDuration,
  ]);

  return (
    <div className="container txt-center border-white">
      <div className="timer__display">
        <span>{minutes(duration)}</span>
        <span>:</span>
        <span>{seconds(duration)}</span>
      </div>
      <div className="timer__control">
        <button onClick={operate}>{isRunning ? "PAUSE" : "START"}</button>
        <button onClick={restart}>STOP</button>
      </div>
      <div>{completedTasks}</div>
    </div>
  );
};
export default Pomodo;
