import React from "react";

export default function PomodoSettings({ intervals, onSubmit }) {
  const [formState, setFormState] = React.useState(intervals);
  const handleChange = (e) => {
    setFormState((formState) => ({
      ...formState,
      [e.target.name]: Number(e.target.value),
    }));
  };
  const { focus, longBreak, shortBreak } = intervals;
  React.useEffect(() => {
    onSubmit(formState);
  }, [formState, onSubmit, focus, longBreak, shortBreak]);

  return (
    <div className="pomodo__settings">
      <form>
        {Object.entries(formState).map(([inputName, inputValue]) => (
          <div key={inputName}>
            <label
              htmlFor={inputName}
            >{` ${inputName} interval duration`}</label>
            <input
              id={inputName}
              name={inputName}
              type="range"
              min="1"
              max="59"
              value={inputValue}
              onChange={handleChange}
            />

            <input
              id={inputName}
              name={inputName}
              type="number"
              value={inputValue}
              onChange={handleChange}
              style={{ width: "10%", textAlign: "center" }}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
