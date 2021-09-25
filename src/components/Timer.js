import React from "react";

const Timer = ({ duration = 25 }) => {
  const initialState = { minutes: duration, seconds: 0, isRunning: false };
  const actionTypes = { OPERATE: "opertate", RESTART: "restart" };
  const timerReducer = (state, { type }) => {
    switch (type) {
      case actionTypes.OPERATE:
        return {
          ...state,
          minutes: state.seconds === 0 ? state.minutes - 1 : state.minutes,
          seconds: state.seconds === 0 ? 59 : state.seconds - 1,
        };
      case actionTypes.RESTART:
        return { ...state, ...initialState };

      default:
        break;
    }
  };
  const [{ minutes, seconds, isRunning }, dispatch] = React.useReducer(
    timerReducer,
    initialState
  );
  return (
    <div className="timer">
      <div className="timer__display">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="timer__control">
        <button onClick={() => dispatch({ type: actionTypes.OPERATE })}>
          {isRunning ? "PAUSE" : "START"}
        </button>
        <button onClick={() => dispatch({ type: actionTypes.RESTART })}>
          RESET
        </button>
      </div>
    </div>
  );
};

export { Timer };
