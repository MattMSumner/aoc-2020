import React, { useState } from "react";
import { initialState } from "./DaySeventeen/initialState";

type Cube = "#" | ".";

type PocketDimension = Cube[][][][];

function parseInitialState(initialState: string): PocketDimension {
  return [
    [
      initialState.split("\n").map((line) =>
        line.split("").map((x) => {
          if (x !== "#" && x !== ".") {
            throw new Error("invalid cube");
          }
          return x;
        })
      ),
    ],
  ];
}

function safeAccess(
  w: number,
  z: number,
  y: number,
  x: number,
  board: PocketDimension
): Cube {
  return (
    (board[w] && board[w][z] && board[w][z][y] && board[w][z][y][x]) || "."
  );
}

function newCube(
  x: number,
  y: number,
  z: number,
  w: number,
  board: PocketDimension
): Cube {
  const occupiedNieghbors = [w - 1, w, w + 1]
    .map((doubleU) =>
      [z - 1, z, z + 1]
        .map((zed) =>
          [y - 1, y, y + 1]
            .map((why) =>
              [x - 1, x, x + 1].map((ex) => {
                if (doubleU === w && zed === z && why === y && ex === x) {
                  return ".";
                }
                return safeAccess(doubleU, zed, why, ex, board);
              })
            )
            .flat()
        )
        .flat()
    )
    .flat()
    .filter((x) => x === "#").length;

  if (safeAccess(w, z, y, x, board) === "#") {
    return [2, 3].includes(occupiedNieghbors) ? "#" : ".";
  } else {
    return occupiedNieghbors === 3 ? "#" : ".";
  }
}

function tick(board: PocketDimension): PocketDimension {
  const newBoardRow = new Array<Cube>(board[0][0][0].length + 2).fill(".");
  const newBoardLayer = new Array<Cube[]>(board[0][0].length + 2).fill(
    newBoardRow
  );
  const newBoardCube = new Array<Cube[][]>(board[0].length + 2).fill(
    newBoardLayer
  );
  const newBoard = new Array<Cube[][][]>(board.length + 2).fill(newBoardCube);

  return newBoard.map((cube, cubeIndex) => {
    return cube.map((layer, layerIndex) => {
      return layer.map((row, rowIndex) => {
        return row.map((element, elementIndex) => {
          return newCube(
            elementIndex - 1,
            rowIndex - 1,
            layerIndex - 1,
            cubeIndex - 1,
            board
          );
        });
      });
    });
  });
}

interface BoardProps {
  board: PocketDimension;
}

const Board: React.FunctionComponent<BoardProps> = ({ board }: BoardProps) => {
  const cubeStrings = board.map((cube) => {
    return cube.map((layer) => {
      return layer.map((row) => row.join("")).join("\n");
    });
  });

  return (
    <>
      {cubeStrings.map((cube, i) => (
        <div className="flex-container" key={i}>
          {cube.map((boardString, j) => (
            <div className="board" key={j}>
              {boardString}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

function countLive(board: PocketDimension): number {
  return board.reduce(
    (acc, cube) =>
      acc +
      cube.reduce(
        (sum, layer) =>
          sum +
          layer.reduce(
            (rowSum, row) =>
              rowSum + row.filter((element) => element === "#").length,
            0
          ),
        0
      ),
    0
  );
}

export const DaySeventeen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const [[count, board], updateBoard] = useState([
    0,
    parseInitialState(initialState),
  ]);
  const liveCount = countLive(board);
  return (
    <>
      <h1>Day Seventeen; Conway Cubes</h1>

      <p>
        <button
          onClick={() => {
            updateBoard([count + 1, tick(board)]);
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
