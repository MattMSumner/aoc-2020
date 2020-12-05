import React from "react";
import { input } from "./DayFour/passports";

type Passport = Record<string, string>;

function parseInput(input: string): Passport[] {
  return input.split("\n").reduce(
    (passports, string) => {
      if (string === "") {
        passports.push({});
        return passports;
      } else {
        const partialPassport = string
          .split(" ")
          .reduce((obj: Passport, pair) => {
            const [key, value] = pair.split(":");
            obj[key] = value;
            return obj;
          }, {});
        passports[passports.length - 1] = {
          ...passports[passports.length - 1],
          ...partialPassport,
        };
        return passports;
      }
    },
    [{}]
  );
}

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function validate(passport: Passport): boolean {
  return requiredFields.every((field) => passport[field]);
}

export const DayFour: React.FunctionComponent<Record<string, never>> = () => {
  const passports = parseInput(input);
  return (
    <>
      <h1>Day Four; </h1>

      <p>There are {passports.filter(validate).length} valid passports</p>

      {passports.map((passport) => {
        const passportString = JSON.stringify(passport);
        return (
          <p key={passportString}>
            the passport {validate(passport) ? "is" : "is not"} valid:{" "}
            {passportString}
          </p>
        );
      })}
    </>
  );
};
