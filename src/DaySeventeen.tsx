import React, { useState } from "react";
import { initialState } from "./DaySeventeen/initialState";

type Cube = "#" | ".";

type PocketDimension = Cube[][][];

function parseInitialState(initialState: string): PocketDimension {
  return [
    initialState.split("\n").map((line) =>
      line.split("").map((x) => {
        if (x !== "#" && x !== ".") {
          throw new Error("invalid cube");
        }
        return x;
      })
    ),
  ];
}

function safeAccess(
  z: number,
  y: number,
  x: number,
  board: PocketDimension
): Cube {
  return (board[z] && board[z][y] && board[z][y][x]) || ".";
}

function newCube(
  x: number,
  y: number,
  z: number,
  board: PocketDimension
): Cube {
  const occupiedNieghbors = [
    safeAccess(z + 1, y - 1, x - 1, board),
    safeAccess(z + 1, y - 1, x, board),
    safeAccess(z + 1, y - 1, x + 1, board),
    safeAccess(z + 1, y, x - 1, board),
    safeAccess(z + 1, y, x, board),
    safeAccess(z + 1, y, x + 1, board),
    safeAccess(z + 1, y + 1, x - 1, board),
    safeAccess(z + 1, y + 1, x, board),
    safeAccess(z + 1, y + 1, x + 1, board),
    safeAccess(z, y - 1, x - 1, board),
    safeAccess(z, y - 1, x, board),
    safeAccess(z, y - 1, x + 1, board),
    safeAccess(z, y, x - 1, board),
    safeAccess(z, y, x + 1, board),
    safeAccess(z, y + 1, x - 1, board),
    safeAccess(z, y + 1, x, board),
    safeAccess(z, y + 1, x + 1, board),
    safeAccess(z - 1, y - 1, x - 1, board),
    safeAccess(z - 1, y - 1, x, board),
    safeAccess(z - 1, y - 1, x + 1, board),
    safeAccess(z - 1, y, x - 1, board),
    safeAccess(z - 1, y, x, board),
    safeAccess(z - 1, y, x + 1, board),
    safeAccess(z - 1, y + 1, x - 1, board),
    safeAccess(z - 1, y + 1, x, board),
    safeAccess(z - 1, y + 1, x + 1, board),
  ].filter((x) => x === "#").length;

  if (safeAccess(z, y, x, board) === "#") {
    return [2, 3].includes(occupiedNieghbors) ? "#" : ".";
  } else {
    return occupiedNieghbors === 3 ? "#" : ".";
  }
}

function tick(board: PocketDimension): PocketDimension {
  const newBoardRow = new Array<Cube>(board[0][0].length + 2).fill(".");
  const newBoardLayer = new Array<Cube[]>(board[0].length + 2).fill(
    newBoardRow
  );
  const newBoard = new Array<Cube[][]>(board.length + 2).fill(newBoardLayer);

  return newBoard.map((layer, layerIndex) => {
    return layer.map((row, rowIndex) => {
      return row.map((element, elementIndex) => {
        return newCube(elementIndex - 1, rowIndex - 1, layerIndex - 1, board);
      });
    });
  });
}

function trimEdges(board: PocketDimension): PocketDimension {
  if (board[0].every((row) => row.every((element) => element === "."))) {
    board.shift();
  }
  if (
    board[board.length - 1].every((row) =>
      row.every((element) => element === ".")
    )
  ) {
    board.pop();
  }

  if (board.every((layer) => layer[0].every((element) => element === "."))) {
    board.forEach((layer) => layer.shift());
  }

  if (
    board.every((layer) =>
      layer[layer.length - 1].every((element) => element === ".")
    )
  ) {
    board.forEach((layer) => layer.pop());
  }

  if (board.every((layer) => layer.every((row) => row[0] === "."))) {
    board.forEach((layer) => layer.forEach((row) => row.shift()));
  }

  if (
    board.every((layer) => layer.every((row) => row[row.length - 1] === "."))
  ) {
    board.forEach((layer) => layer.forEach((row) => row.pop()));
  }

  return board;
}

interface BoardProps {
  board: PocketDimension;
}

const Board: React.FunctionComponent<BoardProps> = ({ board }: BoardProps) => {
  const boardStrings = board.map((layer) => {
    return layer.map((row) => row.join("")).join("\n");
  });

  return (
    <>
      {boardStrings.map((boardString, index) => (
        <>
          <div className="board" key={index}>
            {boardString}
          </div>
          <hr />
        </>
      ))}
    </>
  );
};

export const DaySeventeen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const [[count, board], updateBoard] = useState([
    0,
    parseInitialState(initialState),
  ]);
  const liveCount = board.reduce(
    (sum, layer) =>
      sum +
      layer.reduce(
        (rowSum, row) =>
          rowSum + row.filter((element) => element === "#").length,
        0
      ),
    0
  );
  return (
    <>
      <h1>Day Seventeen; Conway Cubes</h1>

      <p>
        <button
          onClick={() => {
            updateBoard([count + 1, trimEdges(tick(board))]);
          }}
        >
          Tick {count}
        </button>
      </p>

      <p>Live count: {liveCount}</p>

      <Board board={board} />
    </>
  );
};
