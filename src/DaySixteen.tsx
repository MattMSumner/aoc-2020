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

export const DaySixteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const answer = parseInput(input);
  const invalidNumbers = answer.nearbyTickets.map((ticket) =>
    validateTicket(ticket, answer.rules)
  );
  return (
    <>
      <h1>Day Sixteen;</h1>

      <p>
        ticket scanning error rate: {invalidNumbers.flat().join(" + ")} ={" "}
        {invalidNumbers.flat().reduce((acc, num) => acc + num, 0)}
      </p>
    </>
  );
};
