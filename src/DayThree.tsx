import React from "react";
import { slopes } from "./DayThree/slopes";

function slideDown(slopes: string[][]): [string[][], number] {
  let x = 0;
  const yVelocity = 3;
  const repeat = Math.ceil(
    (yVelocity * (slopes.length - 1)) / slopes[0].length
  );
  let trees = 0;

  const map = slopes
    .map((row) => new Array(repeat).fill(row).flat())
    .map((row) => {
      if (row[x] === "#") {
        row[x] = "X";
        trees += 1;
      } else {
        row[x] = "O";
      }
      x += 3;
      return row;
    });

  return [map, trees];
}

export const DayThree: React.FunctionComponent<Record<string, never>> = () => {
  const [map, trees] = slideDown(slopes);
  return (
    <>
      <h1>Day Three; Slopes</h1>

      <div className="slope">
        {map.map((row, i) => (
          <div key={i}>
            {row.map((element, j) => (
              <div key={i + j} className="slope-element">
                {element}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p>there were {trees} trees hit!</p>
    </>
  );
};
