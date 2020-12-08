import React from "react";
import { bootCode } from "./DayEight/bootCode";

interface Instruction {
  operation: string;
  argument: number;
}

function parseBootCode(bootCode: string): Instruction[] {
  return bootCode.split("\n").map((line) => {
    const [operation, argument] = line.split(" ");
    return { operation, argument: parseInt(argument) };
  });
}

function boot(instructions: Instruction[]): number {
  let acc = 0;
  const pointer = [0];
  while (pointer.length === new Set(pointer).size) {
    const currentInstruction = instructions[pointer[0]];
    if (currentInstruction.operation === "nop") {
      pointer.unshift(pointer[0] + 1);
    } else if (currentInstruction.operation === "jmp") {
      pointer.unshift(pointer[0] + currentInstruction.argument);
    } else {
      acc = acc + currentInstruction.argument;
      pointer.unshift(pointer[0] + 1);
    }
  }
  return acc;
}

export const DayEight: React.FunctionComponent<Record<string, never>> = () => {
  return (
    <>
      <h1>Day Eight; Handheld Halting</h1>

      <p>{boot(parseBootCode(bootCode))}</p>
    </>
  );
};
