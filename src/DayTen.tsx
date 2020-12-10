import React from "react";
import { adapters } from "./DayTen/adapters";

function parseAdapters(adapters: string): number[] {
  return adapters.split("\n").map((x) => parseInt(x));
}

function deviceJoltage(adapterRatings: number[]): number {
  return Math.max(...adapterRatings) + 3;
}

interface Differences {
  one: number;
  two: number;
  three: number;
}

function countAdapters(adapterRatings: number[]): Differences {
  return adapterRatings
    .sort((a, b) => a - b)
    .reduce(
      (differences, adapter, index, list) => {
        if (index + 1 !== adapterRatings.length) {
          switch (list[index + 1] - adapter) {
            case 1:
              return { ...differences, one: differences.one + 1 };
              break;
            case 2:
              return { ...differences, two: differences.two + 1 };
              break;
            case 3:
              return { ...differences, three: differences.three + 1 };
              break;
            default:
              throw new Error("difference is greater than 3");
          }
        } else {
          return differences;
        }
      },
      { one: 0, two: 0, three: 0 }
    );
}

export const DayTen: React.FunctionComponent<Record<string, never>> = () => {
  const adapterRatings = parseAdapters(adapters);
  const device = deviceJoltage(adapterRatings);
  const differences = countAdapters([0, ...adapterRatings, device]);
  return (
    <>
      <h1>Day Ten; Adapter Array</h1>

      <p>Device built in joltage: {device}</p>

      <p>
        There are {differences.one} 1-jolt, {differences.two} 2-jolt, and{" "}
        {differences.three} 3-jolt adapter jumps
      </p>

      <p>
        1-jolt multiplied by 3-jolt differences is: {differences.one} x{" "}
        {differences.three} = {differences.one * differences.three}
      </p>
    </>
  );
};
