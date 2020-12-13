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

export const DayThirteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const [timestamp, routes] = parseBusses(busses);
  const [departure, bus] = findClosestsBus(timestamp, routes);
  return (
    <>
      <h1>Day One; Expense Report</h1>

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
    </>
  );
};
