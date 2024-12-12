import * as Prelude from "./prelude.ts";

function parse(input: string): number[] {
  return input.trim().split(" ").map((x) => parseInt(x));
}

function stoneTransform(stone: number): number[] {
  if (stone == 0) return [1];

  const s = stone.toString();
  if (stone.toString().length & 1) return [2024 * stone];

  return [s.slice(0, s.length / 2), s.slice(s.length / 2)].map((x) =>
    parseInt(x)
  );
}

function solve(input: string, iters: number): number {
  let stones: Record<number, number> = Object.fromEntries(
    parse(input).map((x) => [x, 1]),
  );
  for (let i = 0; i < iters; i++) {
    const newStones: Record<number, number> = {};
    for (const [stone, count] of Object.entries(stones)) {
      for (const substone of stoneTransform(parseInt(stone))) {
        newStones[substone] = (newStones[substone] ?? 0) + count;
      }
    }
    stones = newStones;
  }
  return Object.values(stones).reduce((a, b) => a + b);
}

export function solveA(input: string): number {
  return solve(input, 25);
}

export const testAnswerA = 55312;

function subsolve(stone: number, itersLeft: number): number {
  if (itersLeft < 1) return 1;
  return stoneTransform(stone).map((substone) =>
    subsolve(substone, itersLeft - 1)
  ).reduce((a, b) => a + b);
}

export function solveB(input: string): number {
  //   return parse(input).map((stone) => subsolve(stone, 75)).reduce((a, b) =>
  //     a + b
  //   );
  return solve(input, 75);
}

Prelude.main(solveA, solveB);
