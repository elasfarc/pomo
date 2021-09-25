import React from "react";

const Timer = ({ duration = 25 }) => {
  const initialState = { minutes: duration, seconds: 0, isRunning: false };
  const actionTypes = {
    RUN: "decrease",
    RESTART: "restart",
    PAUSE: "pause",
  };
  const timerReducer = (state, { type }) => {
    switch (type) {
      case actionTypes.RUN:
        return {
          ...state,
          minutes: state.seconds === 0 ? state.minutes - 1 : state.minutes,
          seconds: state.seconds === 0 ? 59 : state.seconds - 1,
          isRunning: true,
        };
      case actionTypes.RESTART:
        return { ...state, ...initialState };

      case actionTypes.PAUSE:
        return { ...state, isRunning: false };

      default:
        console.error("undefined type");
    }
  };
  const [{ minutes, seconds, isRunning }, dispatch] = React.useReducer(
    timerReducer,
    initialState
  );
  const intervalRef = React.useRef();

  const operate = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      dispatch({ type: actionTypes.PAUSE });
    } else
      intervalRef.current = setInterval(
        () => dispatch({ type: actionTypes.RUN }),
        1000
      );
  };

  return (
    <div className="timer">
      <div className="timer__display">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="timer__control">
        <button onClick={operate}>{isRunning ? "PAUSE" : "START"}</button>
        <button onClick={() => dispatch({ type: actionTypes.RESTART })}>
          RESET
        </button>
      </div>
    </div>
  );
};

export { Timer };
