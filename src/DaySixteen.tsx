import React from "react";
import { tickets as input } from "./DaySixteen/tickets";

type Ticket = number[];

interface Rule {
  name: string;
  lowerRange: [number, number];
  upperRange: [number, number];
}

interface Answer {
  rules: Rule[];
  myTicket: Ticket;
  nearbyTickets: Ticket[];
}

function range(rangeString: string): [number, number] {
  const [lower, upper] = rangeString.split("-");
  return [parseInt(lower), parseInt(upper)];
}

function parseRules(ruleString: string): Rule[] {
  return ruleString.split("\n").map((rule) => {
    const [name, ranges] = rule.split(": ");
    const [lower, upper] = ranges.split(" or ");
    return {
      name,
      lowerRange: range(lower),
      upperRange: range(upper),
    };
  });
}

function parseTickets(ticketString: string): Ticket[] {
  const lines = ticketString.split("\n");
  return lines.splice(1).map((x) => x.split(",").map((x) => parseInt(x)));
}

function parseInput(input: string): Answer {
  const [ruleString, myTicketString, nearbyTicketsString] = input.split("\n\n");
  return {
    rules: parseRules(ruleString),
    myTicket: parseTickets(myTicketString)[0],
    nearbyTickets: parseTickets(nearbyTicketsString),
  };
}

function validateTicket(ticket: Ticket, rules: Rule[]): number[] {
  const ranges: [number, number][] = rules
    .map((rule) => [rule.lowerRange, rule.upperRange])
    .flat();
  return ticket.filter((value) =>
    ranges.every(([lower, upper]) => value < lower || value > upper)
  );
}

type LabeledTicket = Map<string, number>;

function validateNumber(value: number, rule: Rule): boolean {
  return [rule.lowerRange, rule.upperRange].some(
    ([lower, upper]) => lower <= value && value <= upper
  );
}

function labelTicket(answer: Answer): LabeledTicket {
  const validTickets = answer.nearbyTickets.filter(
    (ticket) => validateTicket(ticket, answer.rules).length === 0
  );
  const possibleTicket = answer.myTicket.map<[number, Rule[]]>(
    (element, position) => {
      const allValues = [element, ...validTickets.map((x) => x[position])];
      const possibleRules = answer.rules.filter((rule) =>
        allValues.every((value) => validateNumber(value, rule))
      );
      return [element, possibleRules];
    }
  );
  return possibleTicket
    .sort((a, b) => a[1].length - b[1].length)
    .reduce<LabeledTicket>((ticket, [value, rules]) => {
      const filteredRules = rules.filter((rule) => !ticket.has(rule.name));
      if (filteredRules.length !== 1) {
        throw new Error("cannot determin rule");
      }
      ticket.set(filteredRules[0].name, value);
      return ticket;
    }, new Map());
}

function departureNumbers(labelledTicket: LabeledTicket): number[] {
  return Array.from(labelledTicket.entries())
    .filter(([name]) => name.match(/^departure/))
    .map((keyValue) => keyValue[1]);
}

export const DaySixteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const answer = parseInput(input);
  const invalidNumbers = answer.nearbyTickets
    .map((ticket) => validateTicket(ticket, answer.rules))
    .flat();
  const labelledTicket = labelTicket(answer);
  const departure = departureNumbers(labelledTicket);
  return (
    <>
      <h1>Day Sixteen;</h1>

      <p>
        ticket scanning error rate: {invalidNumbers.join(" + ")} ={" "}
        {invalidNumbers.reduce((acc, num) => acc + num, 0)}
      </p>

      <h2>Labeled Ticket</h2>

      <p>
        {Array.from(labelledTicket.entries())
          .map(
            ([name, value]) => `${name}:
        ${value}`
          )
          .join(", ")}
      </p>

      <p>
        What do you get if you multiply those six values together?:{" "}
        {departure.join(" x ")} = {departure.reduce((acc, num) => acc * num, 1)}
      </p>
    </>
  );
};
