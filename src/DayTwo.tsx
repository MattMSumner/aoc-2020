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

function isTobogganValid(password: Password): boolean {
  const [indexOne, indexTwo, letter, passwordText] = password;
  const letters = passwordText.split("");

  if (letters[indexOne - 1] === letter) {
    return letters[indexTwo - 1] !== letter;
  } else {
    return letters[indexTwo - 1] === letter;
  }
}

export const DayTwo: React.FunctionComponent<Record<string, never>> = () => {
  const validPasswordCount = passwords.filter(isValid).length;
  const validTobogganPasswordCount = passwords.filter(isTobogganValid).length;
  return (
    <>
      <h1>Day Two; Passwords</h1>

      <p>There are {validPasswordCount} valid passwords</p>

      <h2>Part Two</h2>

      <p>There are {validTobogganPasswordCount} valid Toboggan passwords</p>
    </>
  );
};
