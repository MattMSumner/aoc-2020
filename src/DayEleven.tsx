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

type CountNeighbours = (i: number, j: number, rows: Space[][]) => number;

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

function visibleNeighbour(
  i: number,
  j: number,
  direction: [number, number],
  rows: Space[][]
): Space | undefined {
  const space = rows[i] && rows[i][j];
  if (space === ".") {
    return visibleNeighbour(
      i + direction[0],
      j + direction[1],
      direction,
      rows
    );
  } else {
    return space;
  }
}

function countVisibleOccupiedNeighbours(
  i: number,
  j: number,
  rows: Space[][]
): number {
  const neighbours = [
    visibleNeighbour(i - 1, j - 1, [-1, -1], rows),
    visibleNeighbour(i - 1, j, [-1, 0], rows),
    visibleNeighbour(i - 1, j + 1, [-1, 1], rows),
    visibleNeighbour(i, j - 1, [0, -1], rows),
    visibleNeighbour(i, j + 1, [0, 1], rows),
    visibleNeighbour(i + 1, j - 1, [1, -1], rows),
    visibleNeighbour(i + 1, j, [1, 0], rows),
    visibleNeighbour(i + 1, j + 1, [1, 1], rows),
  ].filter((space) => space === "#");
  return neighbours.length;
}

function tick(
  roomLayout: Layout,
  tolerance: number,
  countNeighbours: CountNeighbours
): Layout {
  const rows = roomLayout.rows.map((row, i, rows) => {
    return row.map((space, j) => {
      const occupiedNeighbours = countNeighbours(i, j, rows);
      if (space === "L" && occupiedNeighbours === 0) {
        return "#";
      } else if (space === "#" && occupiedNeighbours >= tolerance) {
        return "L";
      }

      return space;
    });
  });
  return { rows };
}

interface RoomProps {
  room: Layout;
}

const Room: React.FunctionComponent<RoomProps> = ({ room }: RoomProps) => {
  const roomString = room.rows.map((row) => row.join("")).join("\n");
  const occupiedSeats = room.rows.flat().filter((space) => space === "#")
    .length;

  return (
    <>
      <div className="room">{roomString}</div>

      <p>There are {occupiedSeats} occupied seats</p>
    </>
  );
};

export const DayEleven: React.FunctionComponent<Record<string, never>> = () => {
  const roomLayout = parseLayout(layout);
  const [rooms, updateRoom] = useState([roomLayout, roomLayout]);
  const onClick = () => {
    updateRoom([
      tick(rooms[0], 4, countOccupiedNeighbours),
      tick(rooms[1], 5, countVisibleOccupiedNeighbours),
    ]);
  };
  return (
    <>
      <h1>Day Eleven; Seating System</h1>

      <Room room={rooms[0]} />

      <Room room={rooms[1]} />

      <button onClick={onClick}>TICK</button>
    </>
  );
};
