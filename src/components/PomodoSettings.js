import React from "react";
export default function PomodoSettings({ intervals, onSubmit }) {
  const [formState, setFormState] = React.useState(intervals);
  console.log(
    "🚀 ~ file: PomodoSettings.js ~ line 4 ~ PomodoSettings ~ formState",
    formState
  );
  const handleChange = (e) => {
    setFormState((formState) => ({
      ...formState,
      [e.target.name]: Number(e.target.value),
    }));
    onSubmit(formState);
  };
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
            />
          </div>
        ))}
      </form>
    </div>
  );
}
