import React from "react";
import { bootCode } from "./DayEight/bootCode";

interface Instruction {
  operation: "acc" | "jmp" | "nop";
  argument: number;
}

function parseBootCode(bootCode: string): Instruction[] {
  return bootCode.split("\n").map((line) => {
    const [operation, argument] = line.split(" ");
    if (operation !== "acc" && operation !== "jmp" && operation !== "nop") {
      throw new Error("unknown operation");
    }
    return { operation, argument: parseInt(argument) };
  });
}

function boot(instructions: Instruction[]): [number, "boot" | "loop"] {
  let acc = 0;
  const pointer = [0];
  while (pointer.length === new Set(pointer).size) {
    if (pointer[0] >= instructions.length || pointer[0] < 0) {
      break;
    }

    const currentInstruction = instructions[pointer[0]];
    if (!currentInstruction) {
      debugger;
    }
    if (currentInstruction.operation === "nop") {
      pointer.unshift(pointer[0] + 1);
    } else if (currentInstruction.operation === "jmp") {
      pointer.unshift(pointer[0] + currentInstruction.argument);
    } else {
      acc = acc + currentInstruction.argument;
      pointer.unshift(pointer[0] + 1);
    }
  }
  return [acc, pointer[0] === instructions.length ? "boot" : "loop"];
}

function findBootable(instructions: Instruction[]): number | undefined {
  let answer;
  let index = 0;
  while (!answer) {
    if (instructions[index].operation !== "acc") {
      const newIntructions = [...instructions];
      newIntructions[index] = {
        operation: instructions[index].operation === "jmp" ? "nop" : "jmp",
        argument: instructions[index].argument,
      };
      const [acc, type] = boot(newIntructions);
      if (type === "boot") {
        answer = acc;
      }
    }
    index++;
  }
  return answer;
}

export const DayEight: React.FunctionComponent<Record<string, never>> = () => {
  const instructions = parseBootCode(bootCode);
  const [answer, type] = boot(instructions);
  const bootableAccumulator = findBootable(instructions);
  return (
    <>
      <h1>Day Eight; Handheld Halting</h1>

      <p>
        The program was a &apos;{type}&apos; with accumulator {answer}
      </p>

      <p>The bootable program has accumulator {bootableAccumulator}</p>
    </>
  );
};
