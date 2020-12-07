import React from "react";
import { bagRules } from "./DaySeven/bagRules";

interface Bag {
  count: number;
  name: string;
}

interface BagRule {
  name: string;
  bags: Bag[];
}

function parseBagRules(bagRules: string): BagRule[] {
  return bagRules.split("\n").map((line) => {
    const [name, contentsString] = line.split(" bags contain ");
    if (contentsString === "no other bags.") {
      return { name, bags: [] };
    } else {
      const bagStrings = contentsString.split(", ");
      return {
        name,
        bags: bagStrings.map((bagString) => {
          const [number, ...words] = bagString.split(" ");
          words.pop();
          return { count: parseInt(number), name: words.join(" ") };
        }),
      };
    }
  });
}

function findBags(bagName: string, bagRules: BagRule[]): BagRule[] {
  const bags = bagRules.filter((rule) => {
    return rule.bags.some((bag) => bag.name.match(bagName));
  });

  if (bags.length === 0) {
    return [];
  } else {
    return bags.concat(
      bags
        .map((bag) => findBags(bag.name, bagRules))
        .reduce((a, b) => a.concat(b), [])
    );
  }
}

function countBags(bagName: string, bagRules: BagRule[]): number {
  return new Set(findBags(bagName, bagRules)).size;
}

export const DaySeven: React.FunctionComponent<Record<string, never>> = () => {
  const rules = parseBagRules(bagRules);
  return (
    <>
      <h1>Day Seven; Handy Haversacks</h1>

      <p>shiny gold bag: {countBags("shiny gold", rules)}</p>

      {rules.map((rule) => (
        <p key={rule.name}>
          {rule.name}:{" "}
          {rule.bags
            .map(
              (bag) => `${bag.count}
            ${bag.name}`
            )
            .join(", ")}
        </p>
      ))}
    </>
  );
};
