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

function applyMask(value: string, mask: string): string {
  const paddedValue = Array.from("0".repeat(36 - value.length))
    .join("")
    .concat(value);
  return paddedValue
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
): Memory {
  const value = applyMask(instruction.value, mask);
  memory.set(instruction.memory, value);
  return memory;
}

export const DayFourteen: React.FunctionComponent<
  Record<string, never>
> = () => {
  const inputs = input
    .split("mask")
    .slice(1)
    .map((string) => parseInput(string));
  const memory = inputs.reduce<Memory>((memory, input) => {
    const { mask, instructions } = input;
    instructions.forEach((instruction) =>
      addValueToMemory(instruction, mask, memory)
    );
    return memory;
  }, new Map());
  const result = Array.from(memory.values()).reduce(
    (sum, value) => sum + parseInt(value, 2),
    0
  );
  return (
    <>
      <h1>Day Fourteen; Docking Data</h1>

      <p>
        {Array.from(memory.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join(" - ")}
      </p>

      <p>Sum of memory: {result}</p>
    </>
  );
};
