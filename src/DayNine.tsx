import React from "react";
import { xmasStream } from "./DayNine/xmasStream";

const preambleLength = 25;

function parseStream(xmasStream: string): number[] {
  return xmasStream.split("\n").map((string) => parseInt(string));
}

function findPair(list: Array<number>, sum: number): [number, number] | null {
  const [head, ...rest] = list;
  const pair = sum - head;

  if (rest.includes(pair) && pair !== head) {
    return [head, pair];
  } else if (rest.length > 0) {
    return findPair(rest, sum);
  } else {
    return null;
  }
}

function findWeakness(stream: number[]): number {
  const preamble = stream.slice(0, preambleLength);
  const pair = findPair(preamble, stream[preambleLength]);

  if (pair) {
    const newStream = stream.slice(1, stream.length);
    return findWeakness(newStream);
  } else {
    return stream[preambleLength];
  }
}

function findSet(stream: number[], weakness: number): number[] {
  let sum = 0;
  let i = 0;
  while (sum < weakness && i < stream.length) {
    sum = sum + stream[i];
    i++;
  }
  if (sum === weakness) {
    return stream.slice(0, i);
  } else {
    const newStream = stream.slice(1, stream.length);
    return findSet(newStream, weakness);
  }
}

export const DayNine: React.FunctionComponent<Record<string, never>> = () => {
  const stream = parseStream(xmasStream);
  const weakness = findWeakness(stream);
  const set = findSet(stream, weakness);
  return (
    <>
      <h1>Day Nine; Encoding Error</h1>

      <p>the weakness is: {weakness}</p>

      <p>the set is: {set.join(", ")}</p>

      <p>the sum of the set is {Math.min(...set) + Math.max(...set)}</p>
    </>
  );
};

//15636471
