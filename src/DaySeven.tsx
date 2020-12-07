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

function containsCount(bagName: string, bagRules: BagRule[]): number {
  const rule = bagRules.find((rule) => rule.name === bagName);
  if (!rule) {
    throw new Error(`no rule found for bag with name ${bagName}`);
  }
  if (rule.bags.length === 0) {
    return 0;
  } else {
    return rule.bags.reduce((count, bag) => {
      return count + bag.count + bag.count * containsCount(bag.name, bagRules);
    }, 0);
  }
}

export const DaySeven: React.FunctionComponent<Record<string, never>> = () => {
  const rules = parseBagRules(bagRules);
  const relevantRules = Array.from(new Set(findBags("shiny gold", rules)));
  const bagCount = relevantRules.length;
  const bagContainsCount = containsCount("shiny gold", rules);
  return (
    <>
      <h1>Day Seven; Handy Haversacks</h1>

      <p>shiny gold bag: {bagCount}</p>

      <p>shiny gold bag contains: {bagContainsCount}</p>

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
