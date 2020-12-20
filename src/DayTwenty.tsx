import React from "react";
import { tileInput } from "./DayTwenty/tileInput";

type Pixel = "." | "#";
interface Tile {
  id: number;
  content: Pixel[][];
}

function parseInput(tileInput: string): Tile[] {
  const tileStrings = tileInput.split("\n\n");
  return tileStrings.map((tileString) => {
    const [idString, ...tiles] = tileString.split("\n");
    const id = parseInt(idString.split("").slice(4).join(""));
    return {
      id,
      content: tiles.map((row) => {
        return row.split("").map((pixel) => {
          if (pixel !== "." && pixel !== "#") throw new Error("invalid pixel");
          return pixel;
        });
      }),
    };
  });
}

type Edge = Pixel[];

function edges(tile: Tile): [Edge, Edge, Edge, Edge] {
  const topEdge = tile.content[0];
  const bottomEdge = tile.content[tile.content.length - 1];
  const rightEdge = tile.content.map((row) => row[0]);
  const leftEdge = tile.content.map((row) => row[row.length - 1]);
  return [topEdge, bottomEdge, rightEdge, leftEdge];
}

function edgesMatch(tileOne: Tile, tileTwo: Tile): boolean {
  if (tileOne === tileTwo) return false;
  const tileTwoEdges = edges(tileTwo).map((edge) => edge.join(""));
  const result = edges(tileOne).some((edge) => {
    return (
      tileTwoEdges.includes(edge.join("")) ||
      tileTwoEdges.includes(edge.join("").split("").reverse().join(""))
    );
  });
  return result;
}

function findCorners(tiles: Tile[]): Tile[] {
  const matches = tiles.map<[Tile, Tile[]]>((tileOne) => {
    return [tileOne, tiles.filter((tileTwo) => edgesMatch(tileOne, tileTwo))];
  });

  return matches
    .filter(([tile, siblings]) => siblings.length === 2)
    .map<Tile>(([tile]) => tile);
}

export const DayTwenty: React.FunctionComponent<Record<string, never>> = () => {
  const tiles = parseInput(tileInput);
  const corners = findCorners(tiles);
  return (
    <>
      <h1>Day One; Jurassic Jigsaw</h1>

      <p>
        Corners are: {corners.map((tile) => tile.id).join(" * ")} ={" "}
        {corners.map((tile) => tile.id).reduce((a, b) => a * b, 1)}
      </p>
    </>
  );
};
