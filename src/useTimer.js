import React from "react";

const actionTypes = {
  RUN: "decrease",
  RESTART: "restart",
  PAUSE: "pause",
  SET_DURATION: "setDuration",
};
const useTimer = ({ duration = 0 }) => {
  const timerReducer = (state, { type, payload }) => {
    switch (type) {
      case actionTypes.RUN:
        return {
          ...state,
          duration: state.duration === 0 ? state.duration : state.duration - 1,
          isRunning: state.duration - 1 === 0 ? false : true,
          isDone: state.duration - 1 === 0 ? true : false,
        };
      case actionTypes.RESTART:
        return { ...state, ...initialState };

      case actionTypes.PAUSE:
        return { ...state, isRunning: false };

      case actionTypes.SET_DURATION:
        const { newDuration } = payload;
        return { ...initialState, duration: newDuration };

      default:
        console.error("undefined type");
    }
  };
  const durationRef = React.useRef(duration * 60);

  const initialState = {
    duration: durationRef.current,
    isRunning: false,
    isDone: true,
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

  const setDuration = React.useCallback((newDuration) => {
    newDuration = newDuration * 60;
    durationRef.current = newDuration;
    dispatch({
      type: actionTypes.SET_DURATION,
      payload: { newDuration },
    });
  }, []);

  const restart = React.useCallback(() => {
    clearInterval(intervalRef.current);
    dispatch({ type: actionTypes.RESTART });
  }, []);

  React.useEffect(() => {
    console.log("isDone?!!!!!");
    if (state.isDone) clearInterval(intervalRef.current);
  }, [state.isDone]);
  console.log("🚀 ~ file: useTimer.js ~ line 50 ~ useTimer ~ state", state);
  return { state, dispatch, operate, restart, setDuration };
};

export { useTimer };
