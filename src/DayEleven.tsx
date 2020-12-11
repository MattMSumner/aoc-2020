import React, { useState } from "react";
import { layout } from "./DayEleven/layout";

type Space = "L" | "." | "#";

interface Layout {
  rows: Space[][];
}

function parseSpace(row: string): Space[] {
  return row.split("").map((row) => {
    if (row === "L" || row === "." || row === "#") {
      return row;
    } else {
      throw new Error("invalid space");
    }
  });
}

function parseLayout(layout: string): Layout {
  const rows = layout.split("\n");
  return { rows: rows.map(parseSpace) };
}

function countOccupiedNeighbours(
  i: number,
  j: number,
  rows: Space[][]
): number {
  const neighbours = [
    rows[i - 1] && rows[i - 1][j - 1],
    rows[i - 1] && rows[i - 1][j],
    rows[i - 1] && rows[i - 1][j + 1],
    rows[i][j - 1],
    rows[i][j + 1],
    rows[i + 1] && rows[i + 1][j - 1],
    rows[i + 1] && rows[i + 1][j],
    rows[i + 1] && rows[i + 1][j + 1],
  ].filter((space) => space === "#");
  return neighbours.length;
}

function tick(roomLayout: Layout): Layout {
  const rows = roomLayout.rows.map((row, i, rows) => {
    return row.map((space, j) => {
      const occupiedNeighbours = countOccupiedNeighbours(i, j, rows);
      if (space === "L" && occupiedNeighbours === 0) {
        return "#";
      } else if (space === "#" && occupiedNeighbours >= 4) {
        return "L";
      }

      return space;
    });
  });
  return { rows };
}

export const DayEleven: React.FunctionComponent<Record<string, never>> = () => {
  const roomLayout = parseLayout(layout);
  const [room, updateRoom] = useState(roomLayout);
  const roomString = room.rows.map((row) => row.join("")).join("\n");
  const occupiedSeats = room.rows.flat().filter((space) => space === "#")
    .length;
  return (
    <>
      <h1>Day Eleven; Seating System</h1>

      <div className="room">{roomString}</div>

      <p>There are {occupiedSeats} occupied seats</p>

      <button onClick={() => updateRoom(tick(room))}>TICK</button>
    </>
  );
};
