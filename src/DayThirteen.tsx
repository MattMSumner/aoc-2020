import React from "react";
import { busses } from "./DayThirteen/busses";

function parseBusses(busses: string): [number, number[]] {
  const [timestamp, routes] = busses.split("\n");
  return [
    parseInt(timestamp),
    routes
      .split(",")
      .filter((x) => x !== "x")
      .map((x) => parseInt(x)),
  ];
}

function findClosestsBus(
  timestamp: number,
  busses: number[]
): [number, number] {
  const results = busses.map<[number, number]>((bus) => {
    return [(Math.floor(timestamp / bus) + 1) * bus, bus];
  });
  const minDeparture = Math.min(...results.map((x) => x[0]));
  return results.find((x) => x[0] === minDeparture) || [0, 0];
}

function parseBussesChallenge(busses: string): [number, number][] {
  const routes = busses.split("\n")[1];
  return routes
    .split(",")
    .map<[string, number]>((x, i) => [x, i])
    .filter((x) => x[0] !== "x")
    .map((x) => [parseInt(x[0]), x[1]]);
}

function timestamp(
  start: (i: number) => number,
  list: [number, number][]
): number {
  const [[bus, offset], ...tail] = list;
  let result;
  if (offset === 0) {
    result = bus;
  }
  let i = 0;
  while (!result) {
    i++;
    if (start(i) >= bus && start(i) % bus === bus - (offset % bus)) {
      result = start(i);
    }
  }
  if (tail.length === 0) {
    return result;
  } else {
    const newStart = (j: number) => start(i + bus * j);
    return timestamp(newStart, tail);
  }
}

function findTimestamp(routes: [number, number][]): number {
  return timestamp((i) => i, routes);
}

export const DayThirteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const [timestamp, routes] = parseBusses(busses);
  const [departure, bus] = findClosestsBus(timestamp, routes);
  const routesWithPositions = parseBussesChallenge(busses);
  const earliestDeparture = findTimestamp(routesWithPositions);
  return (
    <>
      <h1>Day One; Shuttle Search</h1>

      <p>
        timestamp: {timestamp}, routes: {routes.join(", ")}
      </p>

      <p>
        departure: {departure}, route: {bus}
      </p>

      <p>
        wait time: {departure - timestamp}, anwser:{" "}
        {(departure - timestamp) * bus}
      </p>

      <h2>Part Two</h2>

      <p>routes: {routesWithPositions.flat().join(", ")}</p>

      <p>earliest departure: {earliestDeparture}</p>
    </>
  );
};
