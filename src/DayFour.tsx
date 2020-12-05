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

function dateValidator(year: string, min: number, max: number): boolean {
  const yearInt = parseInt(year);
  return yearInt >= min && yearInt <= max;
}

function heightValidator(height: string): boolean {
  const heightValue = parseInt(height);
  if (height.match(/cm/)) {
    return heightValue >= 150 && heightValue <= 193;
  } else {
    return heightValue >= 59 && heightValue <= 76;
  }
}

function hairColorValidator(color: string): boolean {
  return !!color.match(/#[0-9a-f]{6}/);
}

function eyeColorValidator(color: string): boolean {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(color);
}

function superValidate(passport: Passport): boolean {
  if (validate(passport)) {
    return (
      dateValidator(passport.byr, 1920, 2002) &&
      dateValidator(passport.iyr, 2010, 2020) &&
      dateValidator(passport.eyr, 2020, 2030) &&
      heightValidator(passport.hgt) &&
      hairColorValidator(passport.hcl) &&
      eyeColorValidator(passport.ecl) &&
      passport.pid.length === 9
    );
  } else {
    return false;
  }
}

export const DayFour: React.FunctionComponent<Record<string, never>> = () => {
  const passports = parseInput(input);
  return (
    <>
      <h1>Day Four; Passports</h1>

      <p>There are {passports.filter(validate).length} valid passports</p>

      <p>
        There are {passports.filter(superValidate).length} super valid passports
      </p>

      {passports.map((passport) => {
        const passportString = JSON.stringify(passport);
        return (
          <p key={passportString}>
            the passport {superValidate(passport) ? "is" : "is not"} valid:{" "}
            {passportString}
          </p>
        );
      })}
    </>
  );
};
