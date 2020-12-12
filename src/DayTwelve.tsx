import React from "react";
import { directions } from "./DayTwelve/directions";

interface Direction {
  command: "N" | "E" | "W" | "S" | "F" | "L" | "R";
  amount: number;
}

function parseDirections(directions: string): Direction[] {
  return directions.split("\n").map((directionString) => {
    const [command, ...numbers] = directionString.split("");
    if (
      command !== "N" &&
      command !== "E" &&
      command !== "W" &&
      command !== "S" &&
      command !== "F" &&
      command !== "L" &&
      command !== "R"
    ) {
      throw new Error("invalid command");
    }
    return {
      command,
      amount: parseInt(numbers.join("")),
    };
  });
}

type Bearing = "N" | "S" | "E" | "W";
interface Location {
  coordinates: [number, number];
  bearing: Bearing;
}

function turnRight(bearing: Bearing): Bearing {
  switch (bearing) {
    case "N":
      return "E";
    case "E":
      return "S";
    case "S":
      return "W";
    case "W":
      return "N";
  }
}

function turn(bearing: Bearing, amount: number): Bearing {
  switch (amount) {
    case 90:
    case -270:
      return turnRight(bearing);
    case 180:
    case -180:
      return turnRight(turnRight(bearing));
    case 270:
    case -90:
      return turnRight(turnRight(turnRight(bearing)));
    default:
      throw new Error("unexpected amount");
  }
}

function move(
  { coordinates, bearing }: Location,
  command: Direction
): Location {
  switch (command.command) {
    case "N":
      return {
        bearing,
        coordinates: [coordinates[0], coordinates[1] + command.amount],
      };
    case "E":
      return {
        bearing,
        coordinates: [coordinates[0] + command.amount, coordinates[1]],
      };
    case "W":
      return {
        bearing,
        coordinates: [coordinates[0] - command.amount, coordinates[1]],
      };
    case "S":
      return {
        bearing,
        coordinates: [coordinates[0], coordinates[1] - command.amount],
      };
    case "F":
      return move(
        { coordinates, bearing },
        { command: bearing, amount: command.amount }
      );
    case "L":
      return { coordinates, bearing: turn(bearing, -command.amount) };
    case "R":
      return { coordinates, bearing: turn(bearing, command.amount) };
  }
}

function navigate(commands: Direction[]): Location {
  return commands.reduce<Location>(move, { coordinates: [0, 0], bearing: "E" });
}

function manhattanDistance(location: Location): number {
  return Math.abs(location.coordinates[0]) + Math.abs(location.coordinates[1]);
}

export const DayTwelve: React.FunctionComponent<Record<string, never>> = () => {
  const commands = parseDirections(directions);
  const endLocation = navigate(commands);
  const distance = manhattanDistance(endLocation);
  return (
    <>
      <h1>Day Twelve; Rain Risk</h1>

      <p>The end location is: {endLocation.coordinates.join(", ")}</p>
      <p>The Manhatten Distance is: {distance}</p>
    </>
  );
};
