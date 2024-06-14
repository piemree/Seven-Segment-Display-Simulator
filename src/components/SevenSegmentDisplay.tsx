import React from "react";
import cn from "classnames";

export type SevenSegmentDisplayValues = {
  a?: boolean;
  b?: boolean;
  c?: boolean;
  d?: boolean;
  e?: boolean;
  f?: boolean;
  g?: boolean;
};

type SevenSegmentDisplayProps = {
  values?: SevenSegmentDisplayValues;
  setValues?: (values: SevenSegmentDisplayValues) => void;
};

const defaultValues = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
};

const segments = ["a", ["f", "b"], "g", ["e", "c"], "d"] as const;

export default function SevenSegmentDisplay({
  values = defaultValues,
  setValues,
}: SevenSegmentDisplayProps) {
  const onSegmentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const segment = e.currentTarget;
    segment.classList.toggle("on");
    const segmentName = segment.textContent as keyof SevenSegmentDisplayValues;
    const newValues = { ...values, [segmentName]: !values[segmentName] };
    if (setValues) setValues(newValues);
  };

  return (
    <div className="seven-segment-display">
      {segments.map((segment, i) => (
        <div key={i}>
          {Array.isArray(segment) ? (
            <div className="flex justify-between">
              {segment.map((s) => (
                <div
                  key={s}
                  className={cn("segment", s, {
                    on: values[s as keyof SevenSegmentDisplayValues],
                  })}
                  onClick={onSegmentClick}
                >
                  {s}
                </div>
              ))}
            </div>
          ) : (
            <div
              className={cn("segment", segment, {
                on: values[segment as keyof SevenSegmentDisplayValues],
              })}
              onClick={onSegmentClick}
            >
              {segment}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
