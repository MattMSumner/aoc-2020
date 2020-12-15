import React from "react";
import { input } from "./DayFourteen/input";

interface Instruction {
  memory: number;
  value: string;
}

interface Input {
  mask: string;
  instructions: Instruction[];
}

function parseInput(input: string): Input {
  const [maskString, ...instructionStrings] = input.split("\n");
  const mask = maskString.split("").slice(3).join("");
  const instructions = instructionStrings
    .filter((x) => x !== "")
    .map((instructionString) => {
      const [memory, value] = [...instructionString.matchAll(/\d+/g)].map((x) =>
        parseInt(x[0])
      );
      return { memory, value: value.toString(2) };
    });
  return { mask, instructions };
}

function padValue(value: string): string {
  return Array.from("0".repeat(36 - value.length))
    .join("")
    .concat(value);
}

function applyMask(value: string, mask: string): string {
  return padValue(value)
    .split("")
    .map((element, index) => {
      if (mask[index] === "X") {
        return element;
      } else {
        return mask[index];
      }
    })
    .join("");
}

type Memory = Map<number, string>;

function addValueToMemory(
  instruction: Instruction,
  mask: string,
  memory: Memory
): void {
  const value = applyMask(instruction.value, mask);
  memory.set(instruction.memory, value);
}

function buildPartOne(): Memory {
  const inputs = input
    .split("mask")
    .slice(1)
    .map((string) => parseInput(string));
  return inputs.reduce<Memory>((memory, input) => {
    const { mask, instructions } = input;
    instructions.forEach((instruction) =>
      addValueToMemory(instruction, mask, memory)
    );
    return memory;
  }, new Map());
}

function floatingBits(acc: string[], bit: string): string[] {
  if (bit === "X") {
    return acc
      .map((head) => head.concat("1"))
      .concat(acc.map((head) => head.concat("0")));
  } else {
    return acc.map((head) => head.concat(bit));
  }
}

function findAddress(mask: string, address: string): number[] {
  const maskedAddress = address.split("").map((element, index) => {
    if (mask[index] === "0") {
      return element;
    } else {
      return mask[index];
    }
  });

  return maskedAddress
    .reduce<string[]>(floatingBits, [""])
    .map((bitAddress) => parseInt(bitAddress, 2));
}

function addValuesToMemory(
  instruction: Instruction,
  mask: string,
  memory: Memory
): void {
  const paddedValue = padValue(instruction.value);
  const paddedAddress = padValue(instruction.memory.toString(2));
  const addresses = findAddress(mask, paddedAddress);
  addresses.map((address) => memory.set(address, paddedValue));
}

function buildPartTwo(): Memory {
  const inputs = input
    .split("mask")
    .slice(1)
    .map((string) => parseInput(string));
  return inputs.reduce<Memory>((memory, input) => {
    const { mask, instructions } = input;
    instructions.forEach((instruction) =>
      addValuesToMemory(instruction, mask, memory)
    );
    return memory;
  }, new Map());
}

function sumMemory(memory: Memory): number {
  return Array.from(memory.values()).reduce(
    (sum, value) => sum + parseInt(value, 2),
    0
  );
}

export const DayFourteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const partOne = buildPartOne();
  const result = sumMemory(partOne);
  const partTwo = buildPartTwo();
  const resultTwo = sumMemory(partTwo);
  return (
    <>
      <h1>Day Fourteen; Docking Data</h1>

      <p>
        {Array.from(partOne.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join(" - ")}
      </p>

      <p>Sum of memory: {result}</p>

      <p>
        {Array.from(partTwo.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join(" - ")}
      </p>

      <p>Sum of memory: {resultTwo}</p>
    </>
  );
};
