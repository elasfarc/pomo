import React from "react";

const actionTypes = {
  RUN: "decrease",
  RESTART: "restart",
  PAUSE: "pause",
};

const useTimer = ({ initialState }) => {
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

  const [state, dispatch] = React.useReducer(timerReducer, initialState);
  const intervalRef = React.useRef();

  const operate = React.useCallback(() => {
    if (state.isRunning) {
      clearInterval(intervalRef.current);
      dispatch({ type: actionTypes.PAUSE });
    } else
      intervalRef.current = setInterval(
        () => dispatch({ type: actionTypes.RUN }),
        1000
      );
  }, [state.isRunning]);

  const restart = React.useCallback(() => {
    clearInterval(intervalRef.current);
    dispatch({ type: actionTypes.RESTART });
  }, []);

  return { state, dispatch, operate, restart };
};

export { useTimer };
