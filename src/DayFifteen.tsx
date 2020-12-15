import React from "react";

const startingNumbers = [11, 0, 1, 10, 5, 19];

function nextNumber(numbers: number[]): number {
  const lastNumber = numbers.pop() || 0;
  if (numbers.filter((number) => number === lastNumber).length === 0) {
    return 0;
  } else {
    return numbers.length - numbers.lastIndexOf(lastNumber);
  }
}

function build2020(startingNumbers: number[]): number[] {
  let i;
  for (i = startingNumbers.length; i < 2020; i++) {
    const clone: number[] = new Array<number>().concat(startingNumbers);
    startingNumbers.push(nextNumber(clone));
  }
  return startingNumbers;
}

export const DayFifteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const result = build2020(startingNumbers);
  return (
    <>
      <h1>Day Fifteen; Rambunctious Recitation</h1>

      <p>{result.join(", ")}</p>

      <p>{result[result.length - 1]}</p>
    </>
  );
};
