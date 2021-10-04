import React from "react";

export default function PomodoSettings({ settings, onSubmit }) {
  const [formState, setFormState] = React.useState(settings);
  const handleChange = (e) => {
    const { type, name, value } = e.target;
    setFormState((formState) => ({
      ...formState,
      [type === "checkbox" ? "autoStart" : "intervals"]:
        type === "checkbox"
          ? !formState.autoStart
          : {
              ...formState.intervals,
              [name]:
                Number(value) > 0 ? Number(value) : formState.intervals[name],
            },
    }));
  };
  const { focus, longBreak, shortBreak, autoStart } = formState;

  React.useEffect(() => {
    onSubmit(formState);
  }, [formState, onSubmit, focus, longBreak, shortBreak]);

  return (
    <div className="pomodo__settings">
      <form>
        {Object.entries(formState.intervals).map(([inputName, inputValue]) => (
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
        <label>Auto-start timer</label>
        <input type="checkbox" checked={autoStart} onChange={handleChange} />
      </form>
    </div>
  );
}
