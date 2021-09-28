import React from "react";
import { usePomodo } from "../usePomodo";

const Timer = ({ focus, shortBreak, longBreak }) => {
  console.log("howmany/////////");

  const {
    state: { duration, isRunning },
    operate,
    restart,
    counter,
    changePomodoSettings,
  } = usePomodo({ focus, shortBreak, longBreak });

  const minutes = parseInt(duration / 60, 10);
  const seconds = duration % 60;
  const [editMode, setEditMode] = React.useState(false);
  const inputRef = React.useRef();
  const [inputDuration, setInputDuration] = React.useState(minutes);

  const handleModeChange = (e) => {
    const { type } = e;
    if (isRunning || (type === "keydown" && e.key !== "Enter")) return;
    if (editMode) changePomodoSettings({ focus: Number(e.target.value) * 60 });
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
      <div>{counter}</div>
    </div>
  );
};

export { Timer };
