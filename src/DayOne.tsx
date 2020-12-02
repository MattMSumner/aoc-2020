import React from "react";
import { expenseReport } from "./DayOne/expenseReport";

function findPair(list: Array<number>): [number, number] {
  const [head, ...rest] = list;
  const pair = 2020 - head;

  if (rest.includes(pair)) {
    return [head, pair];
  } else {
    return findPair(rest);
  }
}

export const DayOne: React.FunctionComponent<Record<string, never>> = () => {
  const [first, second] = findPair(expenseReport);
  return (
    <>
      <h1>Day One; Expense Report</h1>

      <p>
        the pair is {first}, {second}
      </p>

      <p>
        Multipled together: {first} x {second} = {first * second}
      </p>
    </>
  );
};
