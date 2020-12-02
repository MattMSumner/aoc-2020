import React from "react";
import { expenseReport } from "./DayOne/expenseReport";

function findPair(list: Array<number>, sum: number): [number, number] | null {
  const [head, ...rest] = list;
  const pair = sum - head;

  if (rest.includes(pair)) {
    return [head, pair];
  } else if (rest.length > 0) {
    return findPair(rest, sum);
  } else {
    return null;
  }
}

function findTriplet(list: Array<number>): [number, number, number] {
  const [head, ...rest] = list;
  const remainder = 2020 - head;
  const maybePair = findPair(rest, remainder);

  if (maybePair) {
    return [head, ...maybePair];
  } else {
    return findTriplet(rest);
  }
}

export const DayOne: React.FunctionComponent<Record<string, never>> = () => {
  const pair = findPair(expenseReport, 2020) || [1, 1];
  const triplet = findTriplet(expenseReport);
  return (
    <>
      <h1>Day One; Expense Report</h1>

      <p>
        the pair is {pair[0]}, {pair[1]}
      </p>

      <p>
        Multipled together: {pair[0]} x {pair[1]} = {pair[0] * pair[1]}
      </p>

      <h2>Part 2</h2>

      <p>
        the triplet is {triplet[0]}, {triplet[1]}, {triplet[2]}
      </p>

      <p>
        Multipled together: {triplet[0]} x {triplet[1]} x {triplet[2]} ={" "}
        {triplet[0] * triplet[1] * triplet[2]}
      </p>
    </>
  );
};
