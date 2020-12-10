import React from "react";
import { adapters } from "./DayTen/adapters";

function parseAdapters(adapters: string): number[] {
  return adapters.split("\n").map((x) => parseInt(x));
}

function deviceJoltage(adapterRatings: number[]): number {
  return Math.max(...adapterRatings) + 3;
}

interface Differences {
  one: number;
  two: number;
  three: number;
}

function countAdapters(adapterRatings: number[]): Differences {
  return adapterRatings
    .sort((a, b) => a - b)
    .reduce(
      (differences, adapter, index, list) => {
        if (index + 1 !== adapterRatings.length) {
          switch (list[index + 1] - adapter) {
            case 1:
              return { ...differences, one: differences.one + 1 };
            case 2:
              return { ...differences, two: differences.two + 1 };
            case 3:
              return { ...differences, three: differences.three + 1 };
            default:
              throw new Error("difference is greater than 3");
          }
        } else {
          return differences;
        }
      },
      { one: 0, two: 0, three: 0 }
    );
}

interface Node {
  currentValue: number;
  pathsLeadingHere: number;
}

function possibleNodes(node: Node, adapterRating: number): Node[] {
  const difference = adapterRating - node.currentValue;
  if (difference === 3) {
    return [
      {
        currentValue: adapterRating,
        pathsLeadingHere: node.pathsLeadingHere,
      },
    ];
  } else if (difference < 3 && difference > 0) {
    return [
      { ...node, pathsLeadingHere: node.pathsLeadingHere },
      {
        currentValue: adapterRating,
        pathsLeadingHere: node.pathsLeadingHere,
      },
    ];
  } else {
    return [];
  }
}

function reduceNodes(bigNodes: Node[]): Node[] {
  return bigNodes.reduce<Node[]>((nodes, bigNode) => {
    const existingNode = nodes.find(
      (node) => node.currentValue === bigNode.currentValue
    );
    if (existingNode) {
      existingNode.pathsLeadingHere =
        existingNode.pathsLeadingHere + bigNode.pathsLeadingHere;
    } else {
      nodes.push(bigNode);
    }
    return nodes;
  }, []);
}

function countPaths(adapterRatings: number[]): number {
  const nodes: Node[] = adapterRatings
    .sort((a, b) => a - b)
    .reduce(
      (nodes, adapterRating) => {
        const bigNodes = nodes
          .map((node) => possibleNodes(node, adapterRating))
          .flat();
        return reduceNodes(bigNodes);
      },
      [{ currentValue: 0, pathsLeadingHere: 1 }]
    );
  return nodes.reduce((sum, node) => sum + node.pathsLeadingHere, 0);
}

export const DayTen: React.FunctionComponent<Record<string, never>> = () => {
  const adapterRatings = parseAdapters(adapters);
  const device = deviceJoltage(adapterRatings);
  const differences = countAdapters([0, ...adapterRatings, device]);
  const possiblePaths = countPaths([...adapterRatings, device]);
  return (
    <>
      <h1>Day Ten; Adapter Array</h1>

      <p>Device built in joltage: {device}</p>

      <p>
        There are {differences.one} 1-jolt, {differences.two} 2-jolt, and{" "}
        {differences.three} 3-jolt adapter jumps
      </p>

      <p>
        1-jolt multiplied by 3-jolt differences is: {differences.one} x{" "}
        {differences.three} = {differences.one * differences.three}
      </p>

      <p>There are {possiblePaths} possible paths</p>
    </>
  );
};
