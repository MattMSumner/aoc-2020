import React from "react";
import { customsForms } from "./DaySix/customsForms";

type Form = Set<string>;

function parseForms(customsForms: string): Form[] {
  return customsForms.split("\n").reduce(
    (forms: Form[], answers: string) => {
      if (answers === "") {
        forms.push(new Set());
        return forms;
      } else {
        answers
          .split("")
          .forEach((answer) => forms[forms.length - 1].add(answer));
        return forms;
      }
    },
    [new Set()]
  );
}

function countAnswers(forms: Form[]): number {
  return forms.reduce((count, form) => count + form.size, 0);
}

export const DaySix: React.FunctionComponent<Record<string, never>> = () => {
  const forms = parseForms(customsForms);
  return (
    <>
      <h1>Day Six; Custom Customs</h1>

      <p>total answer: {countAnswers(forms)}</p>

      {forms.map((form, index) => (
        <p key={index}>{form}</p>
      ))}
    </>
  );
};
