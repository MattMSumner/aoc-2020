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

function parseGroups(customsForms: string): string[][][] {
  return customsForms.split("\n").reduce(
    (groups: string[][][], answers: string) => {
      if (answers === "") {
        groups.push([]);
        return groups;
      } else {
        groups[groups.length - 1].push(answers.split(""));
        return groups;
      }
    },
    [[]]
  );
}

function findAll(group: string[][]): Form {
  const [head, ...tail] = group;
  const answers: string[] = tail.reduce((commonAnswer, answers) => {
    return answers.reduce((keep: string[], answer) => {
      if (commonAnswer.includes(answer)) {
        keep.push(answer);
      }
      return keep;
    }, []);
  }, head);

  return new Set(answers);
}

function parseFormsAll(customsForms: string): Form[] {
  const groups = parseGroups(customsForms);
  return groups.map(findAll);
}

export const DaySix: React.FunctionComponent<Record<string, never>> = () => {
  const forms = parseForms(customsForms);
  const realForms = parseFormsAll(customsForms);
  return (
    <>
      <h1>Day Six; Custom Customs</h1>

      <p>total answers: {countAnswers(forms)}</p>

      <p>total real answers: {countAnswers(realForms)}</p>

      {forms.map((form, index) => (
        <p key={index}>{form}</p>
      ))}
    </>
  );
};
