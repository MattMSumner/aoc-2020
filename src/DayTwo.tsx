import React from "react";
import { Password, passwords } from "./DayTwo/passwords";

function isValid(password: Password): boolean {
  const [min, max, letter, passwordText] = password;

  const letterCount = passwordText
    .split("")
    .reduce(
      (count, character) => (character === letter ? count + 1 : count),
      0
    );
  return letterCount >= min && letterCount <= max;
}

export const DayTwo: React.FunctionComponent<Record<string, never>> = () => {
  const validPasswordCount = passwords.filter(isValid).length;
  return (
    <>
      <h1>Day Two; Passwords</h1>

      <p>There are {validPasswordCount} valid passwords</p>
    </>
  );
};
