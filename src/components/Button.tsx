import React, { useState } from "react";
import { SevenSegmentDisplayValues } from "./SevenSegmentDisplay";
import c from "classnames";

export type ButtonProps = {
  id: string;
  Text: string;
  setDisplayValues: (value: SevenSegmentDisplayValues) => void;
  displayValues: SevenSegmentDisplayValues;
  className?: string;
};

export default function Button(props: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    props.setDisplayValues(props.displayValues);
  };

  return (
    <button
      onClick={handleClick}
      className={c(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        props.className
      )}
    >
      {props.Text}
    </button>
  );
}
