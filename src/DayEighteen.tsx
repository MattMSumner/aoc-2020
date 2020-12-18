import React from "react";
import { questions } from "./DayEighteen/questions";

function evaluate(question: string): number {
  const firstParenthesis = question.match(/\(([^\)\(]+)\)/);
  if (firstParenthesis) {
    const replaceWith = evaluate(firstParenthesis[1]);
    return evaluate(question.replace(firstParenthesis[0], `${replaceWith}`));
  }

  const [answer] = question.split(" ").reduce<[number, "+" | "*" | undefined]>(
    ([answer, sign], numberOrSign) => {
      if (numberOrSign === "+" || numberOrSign === "*") {
        return [answer, numberOrSign];
      } else if (sign === "+") {
        return [answer + parseInt(numberOrSign), undefined];
      } else if (sign === "*") {
        return [answer * parseInt(numberOrSign), undefined];
      } else {
        return [parseInt(numberOrSign), undefined];
      }
    },
    [0, undefined]
  );

  return answer;
}

export const DayEighteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const answers = questions.split("\n").map(evaluate);
  return (
    <>
      <h1>Day One; Operation Order</h1>

      <p>{answers.reduce((count, num) => count + num, 0)}</p>
    </>
  );
};
