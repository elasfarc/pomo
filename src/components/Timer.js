import React from "react";
import { useTimer } from "../useTimer";

const Timer = ({ duration = 25 }) => {
  const initialState = { minutes: duration, seconds: 0, isRunning: false };
  const {
    state: { minutes, seconds, isRunning },
    operate,
    restart,
  } = useTimer({ initialState });
  return (
    <div className="timer">
      <div className="timer__display">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="timer__control">
        <button onClick={operate}>{isRunning ? "PAUSE" : "START"}</button>
        <button onClick={restart}>RESET</button>
      </div>
    </div>
  );
};

export { Timer };
