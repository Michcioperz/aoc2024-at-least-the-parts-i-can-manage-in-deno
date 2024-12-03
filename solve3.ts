import * as Prelude from "./prelude.ts";

export function solveA(input: string): number {
  return Array.from(input.matchAll(/mul\((\d+?),(\d+?)\)/g)).map((
    [expr, a, b],
  ) => parseInt(a) * parseInt(b)).reduce((a, b) => a + b);
}

export const testAnswerA = 161;

export function solveB(input: string): number {
  let sum = 0;
  let enabled = true;
  for (
    const match of input.matchAll(/do\(\)|don't\(\)|mul\((\d+?),(\d+?)\)/g)
  ) {
    switch (match[0]) {
      case "do()":
        enabled = true;
        break;
      case "don't()":
        enabled = false;
        break;
      default:
        if (enabled) sum += parseInt(match[1]) * parseInt(match[2]);
    }
  }
  return sum;
}

export const testAnswerB = 48;

Prelude.main(solveA, solveB);
