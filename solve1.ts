import * as Prelude from "./prelude.ts";

function parse(input: string): { left: number[]; right: number[] } {
  const left = [], right = [];
  for (const line of input.split("\n").map((s) => s.trim())) {
    const [a, b] = line.split(/\s+/);
    left.push(parseInt(a));
    right.push(parseInt(b));
  }
  return { left, right };
}

export function solveA(input: string): number {
  const { left, right } = parse(input);
  left.sort();
  right.sort();
  let sum = 0;
  for (const i in left) {
    sum += Math.abs(left[i] - right[i]);
  }
  return sum;
}

export const testAnswerA = 11;

export function solveB(input: string): number {
  const { left, right } = parse(input);
  const leftCounts = counts(left);
  const rightCounts = counts(right);
  let sum = 0;
  for (const x in leftCounts) {
    sum += parseInt(x) * leftCounts[x] * (rightCounts[x] ?? 0);
  }
  return sum;
}

export const testAnswerB = 31;

function counts(xs: number[]): Record<number, number> {
  const cs: Record<number, number> = {};
  for (const x of xs) {
    cs[x] = (cs[x] ?? 0) + 1;
  }
  return cs;
}

Prelude.main(solveA, solveB);
