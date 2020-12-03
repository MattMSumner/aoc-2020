import React, { useState } from "react";
import { slopes } from "./DayThree/slopes";

function slideDown(
  slopes: string[][],
  velocity: [number, number]
): [string[][], number] {
  let x = 0;
  const [xVelocity, yVelocity] = velocity;
  const repeat = Math.ceil(
    (xVelocity * (slopes.length - 1)) / slopes[0].length
  );
  let trees = 0;

  const map = slopes
    .map((row) => new Array(repeat).fill(row).flat())
    .map((row, i) => {
      if (i % yVelocity) {
        console.log("skip");
      } else if (row[x] === "#") {
        row[x] = "X";
        trees += 1;
        x += xVelocity;
      } else {
        row[x] = "O";
        x += xVelocity;
      }
      return row;
    });

  return [map, trees];
}

interface MapProps {
  map: string[][];
}

const Map = ({ map }: MapProps) => {
  const [showMap, setShowMap] = useState(false);

  const mapString = map.map((row) => row.join("")).join("\n");
  return (
    <>
      <button
        onClick={() => {
          setShowMap(!showMap);
        }}
      >
        {showMap ? "Hide" : "Show"} Map
      </button>

      {showMap && <div className="slope">{mapString}</div>}
    </>
  );
};

export const DayThree: React.FunctionComponent<Record<string, never>> = () => {
  const [amap, atrees] = slideDown(slopes, [1, 1]);
  const [bmap, btrees] = slideDown(slopes, [3, 1]);
  const [cmap, ctrees] = slideDown(slopes, [5, 1]);
  const [dmap, dtrees] = slideDown(slopes, [7, 1]);
  const [emap, etrees] = slideDown(slopes, [1, 2]);
  return (
    <>
      <h1>Day Three; Slopes</h1>

      <Map map={bmap} />

      <p>there were {btrees} trees hit!</p>

      <h2>Part 2</h2>

      <h3>Right 1, down 1.</h3>

      <Map map={amap} />

      <p>there were {atrees} trees hit!</p>

      <h3>Right 3, down 1. (This is the slope you already checked.)</h3>

      <Map map={bmap} />

      <p>there were {btrees} trees hit!</p>

      <h3>Right 5, down 1.</h3>

      <Map map={cmap} />

      <p>there were {ctrees} trees hit!</p>

      <h3>Right 7, down 1.</h3>

      <Map map={dmap} />

      <p>there were {dtrees} trees hit!</p>

      <h3>Right 1, down 2.</h3>

      <Map map={emap} />

      <p>there were {etrees} trees hit!</p>

      <h2>Multiplied trees!</h2>

      <p>
        {atrees} x {btrees} x {ctrees} x {dtrees} x {etrees} ={" "}
        {atrees * btrees * ctrees * dtrees * etrees}
      </p>
    </>
  );
};
