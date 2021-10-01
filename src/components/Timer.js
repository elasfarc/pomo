import React from "react";
import Pomodo from "../usePomodo";

const Timer = ({ focus, shortBreak, longBreak }) => {
  console.log("howmany/////////");

  return (
    <div className="timer">
      <Pomodo />
    </div>
  );
};

export { Timer };
