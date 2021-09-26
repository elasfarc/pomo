import React from "react";
import { useTimer } from "../useTimer";

const Timer = ({ duration = 25 }) => {
  console.log("howmany/////////");
  const initialState = { minutes: duration, seconds: 0, isRunning: false };
  const [editMode, setEditMode] = React.useState(false);
  const {
    state: { minutes, seconds, isRunning },
    operate,
    restart,
    setDuration,
  } = useTimer({ initialState });

  const inputRef = React.useRef();

  const handleModeChange = (e) => {
    const { type } = e;
    if (type === "keydown" && e.key !== "Enter") return;
    if (editMode) setDuration(e.target.value);
    setEditMode((mode) => !mode);
  };
  React.useLayoutEffect(() => {
    if (editMode) inputRef.current.focus();
  }, [editMode]);
  return (
    <div className="timer">
      <div className="timer__display">
        {editMode ? (
          <input
            type="number"
            ref={inputRef}
            onBlur={handleModeChange}
            onKeyDown={handleModeChange}
          />
        ) : (
          <>
            <span onClick={handleModeChange}>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </>
        )}
      </div>
      <div className="timer__control">
        <button onClick={operate}>{isRunning ? "PAUSE" : "START"}</button>
        <button onClick={restart}>RESET</button>
      </div>
    </div>
  );
};

export { Timer };
