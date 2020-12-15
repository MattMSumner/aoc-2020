import React from "react";

const startingNumbers = [11, 0, 1, 10, 5, 19];

interface Detail {
  index: number;
  previousIndex?: number;
}

type Answer = Map<number, Detail>;

function nextNumber(
  numberMap: Answer,
  index: number,
  lastNumber: number
): [number, Detail] {
  const detail = numberMap.get(lastNumber);
  if (!detail) {
    throw new Error("what");
  }

  if (detail.previousIndex === undefined) {
    return [0, { index, previousIndex: numberMap.get(0)?.index }];
  } else {
    const newNumber = detail.index - detail.previousIndex;
    return [
      newNumber,
      { index, previousIndex: numberMap.get(newNumber)?.index },
    ];
  }
}

function buildTo(startingNumbers: number[], limit: number): number {
  const map = new Map<number, Detail>();
  startingNumbers.map((number, index) => map.set(number, { index }));
  let i;
  let lastNumber = startingNumbers[startingNumbers.length - 1];
  for (i = startingNumbers.length; i < limit; i++) {
    const [newValue, detail] = nextNumber(map, i, lastNumber);
    map.set(newValue, detail);
    lastNumber = newValue;
  }
  return lastNumber;
}

export const DayFifteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const result = buildTo(startingNumbers, 30000000);
  return (
    <>
      <h1>Day Fifteen; Rambunctious Recitation</h1>

      <p>{result}</p>
    </>
  );
};
