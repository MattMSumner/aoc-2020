import React from "react";
import { directions } from "./DayTwelve/directions";

type Coordinates = [number, number];

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
  coordinates: Coordinates;
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

interface Ship {
  coordinates: Coordinates;
  waypoint: Coordinates;
}

function rotateWaypoint(waypoint: Coordinates, amount: number): Coordinates {
  switch (amount) {
    case 90:
    case -270:
      return [waypoint[1], -waypoint[0]];
    case 180:
    case -180:
      return [-waypoint[0], -waypoint[1]];
    case 270:
    case -90:
      return [-waypoint[1], waypoint[0]];
    default:
      throw new Error("unexpected amount");
  }
}

function waypointMove(
  { coordinates, waypoint }: Ship,
  command: Direction
): Ship {
  switch (command.command) {
    case "N":
      return {
        coordinates,
        waypoint: [waypoint[0], waypoint[1] + command.amount],
      };
    case "E":
      return {
        coordinates,
        waypoint: [waypoint[0] + command.amount, waypoint[1]],
      };
    case "W":
      return {
        coordinates,
        waypoint: [waypoint[0] - command.amount, waypoint[1]],
      };
    case "S":
      return {
        coordinates,
        waypoint: [waypoint[0], waypoint[1] - command.amount],
      };
    case "F":
      return {
        coordinates: [
          coordinates[0] + command.amount * waypoint[0],
          coordinates[1] + command.amount * waypoint[1],
        ],
        waypoint,
      };
    case "L":
      return {
        coordinates,
        waypoint: rotateWaypoint(waypoint, -command.amount),
      };
    case "R":
      return {
        coordinates,
        waypoint: rotateWaypoint(waypoint, command.amount),
      };
  }
}

function waypointNavigate(commands: Direction[]): Coordinates {
  const ship = commands.reduce<Ship>(waypointMove, {
    coordinates: [0, 0],
    waypoint: [10, 1],
  });

  return ship.coordinates;
}

function manhattanDistance(coordinates: Coordinates): number {
  return Math.abs(coordinates[0]) + Math.abs(coordinates[1]);
}

export const DayTwelve: React.FunctionComponent<Record<string, never>> = () => {
  const commands = parseDirections(directions);
  const endLocation = navigate(commands);
  const distance = manhattanDistance(endLocation.coordinates);
  const waypointEndCoordinates = waypointNavigate(commands);
  const waypointDistance = manhattanDistance(waypointEndCoordinates);
  return (
    <>
      <h1>Day Twelve; Rain Risk</h1>

      <p>The end location is: {endLocation.coordinates.join(", ")}</p>
      <p>The Manhatten Distance is: {distance}</p>

      <h2>Part Two</h2>

      <p>The end location is: {waypointEndCoordinates.join(", ")}</p>
      <p>The Manhatten Distance is: {waypointDistance}</p>
    </>
  );
};
