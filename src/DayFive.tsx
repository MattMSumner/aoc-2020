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

function find(seatIds: number[]): number {
  let i = 0;
  const sortedSeatIds = seatIds.sort((a, b) => a - b);
  let result = 0;

  while (i < sortedSeatIds.length) {
    if (sortedSeatIds[i + 1] - sortedSeatIds[i] !== 1) {
      result = sortedSeatIds[i] + 1;
      break;
    } else {
      i++;
    }
  }

  return result;
}

export const DayFive: React.FunctionComponent<Record<string, never>> = () => {
  const seatIds = boardingPasses.split("\n").map(seatId);

  return (
    <>
      <h1>Day Five; Binary Boarding</h1>

      <p>seat ids: {seatIds.sort((a, b) => a - b).join(", ")}</p>

      <p>Max seat id: {Math.max(...seatIds)}</p>

      <p>My seat id: {find(seatIds)}</p>
    </>
  );
};
