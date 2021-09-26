import React from "react";

const actionTypes = {
  RUN: "decrease",
  RESTART: "restart",
  PAUSE: "pause",
  SET_DURATION: "setDuration",
};

const useTimer = ({ initialState }) => {
  const timerReducer = (state, { type, payload }) => {
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

      case actionTypes.SET_DURATION:
        return { ...initialState, minutes: payload.duration };

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

  const setDuration = React.useCallback((duration) => {
    dispatch({ type: actionTypes.SET_DURATION, payload: { duration } });
  }, []);

  console.log("🚀 ~ file: useTimer.js ~ line 50 ~ useTimer ~ state", state);
  return { state, dispatch, operate, restart, setDuration };
};

export { useTimer };
