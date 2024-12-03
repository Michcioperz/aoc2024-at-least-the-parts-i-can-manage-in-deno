import * as Prelude from "./prelude.ts";

function parse(input: string): number[][] {
  return input.split("\n").map((s) =>
    s.trim().split(/\s+/).map((x) => parseInt(x))
  );
}

type Property = (a: number, b: number) => boolean;
function allUphold(line: number[], property: Property) {
  for (let i = 1; i < line.length; i++) {
    if (!property(line[i - 1], line[i])) {
      return false;
    }
  }
  return true;
}

function allUpholdWithOneFault(line: number[], property: Property) {
  let faulted: number | undefined = undefined;
  for (let i = 1; i < line.length; i++) {
    const i_minus_1 = faulted;
    if (!property(line[i - 1], line[i])) {
      return false;
    }
  }
  return true;
}

function composedProperty(): (line: number[]) => boolean {
  return (
    line,
  ) => (allUphold(line, (a, b) => ((a + 1) <= b && (a + 3) >= b)) ||
    allUphold(line, (a, b) => ((a - 1) >= b && (a - 3) <= b)));
}

export function solveA(input: string): number {
  return parse(input).filter(composedProperty()).length;
}

export const testAnswerA = 2;

export function solveB(input: string): number {
  return parse(input).filter(composedProperty(2)).length;
}

export const testAnswerB = 4;

Prelude.main(solveA);
