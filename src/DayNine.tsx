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
  debugger;

  if (pair) {
    const newStream = stream.slice(1, stream.length);
    return findWeakness(newStream);
  } else {
    return stream[preambleLength];
  }
}

export const DayNine: React.FunctionComponent<Record<string, never>> = () => {
  return (
    <>
      <h1>Day Nine; Encoding Error</h1>

      <p>{findWeakness(parseStream(xmasStream))}</p>
    </>
  );
};
