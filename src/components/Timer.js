import React from "react";
import { useTimer } from "../useTimer";

const Timer = ({ duration }) => {
  console.log("howmany/////////");

  const [editMode, setEditMode] = React.useState(false);
  const {
    state: { minutes, seconds, isRunning },
    operate,
    restart,
    setDuration,
  } = useTimer({ duration });

  const inputRef = React.useRef();
  const [inputDuration, setInputDuration] = React.useState(minutes);

  const handleModeChange = (e) => {
    const { type } = e;
    if (isRunning || (type === "keydown" && e.key !== "Enter")) return;
    if (editMode) setDuration(Number(e.target.value));
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
            value={inputDuration}
            onChange={({ target: { value } }) => setInputDuration(value)}
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
