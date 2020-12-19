import React from "react";
import { rulesAndMessages } from "./DayNineteen/rulesAndMessages";

type Rule = (x: string) => string | null;
type RuleMap = Map<number, Rule>;

function buildRuleFunction(rule: string, map: RuleMap): Rule {
  if (rule === '"a"') {
    return ([head, ...tail]) => (head === "a" ? tail.join("") : null);
  }
  if (rule === '"b"') {
    return ([head, ...tail]) => (head === "b" ? tail.join("") : null);
  }

  const ors = rule.split(" | ");
  if (ors.length === 2) {
    return (string) => {
      const left = buildRuleFunction(ors[0], map)(string);
      if (left === null) {
        return buildRuleFunction(ors[1], map)(string);
      }
      return left;
    };
  }

  const keys = rule.split(" ").map((key) => parseInt(key));
  return (string) => {
    return keys.reduce<string | null>((newString, key) => {
      const func = map.get(key);
      if (!func) {
        throw new Error(`could not find function for key ${key}`);
      }
      return newString && func(newString);
    }, string);
  };
}

function parseInput(rulesAndMessages: string): [RuleMap, string[]] {
  const [ruleString, messageString] = rulesAndMessages.split("\n\n");
  const ruleMap = ruleString.split("\n").reduce<RuleMap>((map, string) => {
    const [key, rule] = string.split(": ");

    map.set(parseInt(key), buildRuleFunction(rule, map));

    return map;
  }, new Map());

  return [ruleMap, messageString.split("\n")];
}

export const DayNineteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const [ruleMap, messages] = parseInput(rulesAndMessages);
  const ruleZero = ruleMap.get(0);
  if (!ruleZero) {
    throw new Error("No rule zero!");
  }
  const validMessages = messages.filter((message) => ruleZero(message) === "");
  return (
    <>
      <h1>Day One; Monster Messages</h1>

      {validMessages.map((message) => (
        <p key={message}>{message}</p>
      ))}

      <p>{validMessages.length}</p>
    </>
  );
};
