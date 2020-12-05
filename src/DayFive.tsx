import React from "react";
import { boardingPasses } from "./DayFive/boardingPasses";

function row(row: string): number {
  const number = row.replaceAll("F", "0").replaceAll("B", "1");
  return parseInt(number, 2);
}

function column(column: string): number {
  const number = column.replaceAll("L", "0").replaceAll("R", "1");
  return parseInt(number, 2);
}

function seatId(boardingPass: string): number {
  const rowString = boardingPass.slice(0, 7);
  const columnString = boardingPass.slice(7, 10);
  console.log({
    rowString,
    columnString,
    row: row(rowString),
    column: column(columnString),
  });
  return row(rowString) * 8 + column(columnString);
}

export const DayFive: React.FunctionComponent<Record<string, never>> = () => {
  const seatIds = boardingPasses.split("\n").map(seatId);

  return (
    <>
      <h1>Day Five; Binary Boarding</h1>

      <p>seat ids: {seatIds.join(", ")}</p>

      <p>Max seat id: {Math.max(...seatIds)}</p>
    </>
  );
};
