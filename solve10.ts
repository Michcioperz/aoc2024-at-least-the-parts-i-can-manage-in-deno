import * as Prelude from "./prelude.ts";

function parse(input: string): number[][] {
  return input.trim().split("\n").map((line) =>
    Array.from(line.trim()).map((x) => parseInt(x))
  );
}

const neighbourDeltas: [number, number][] = [
  [0, 1],
  // [1, 1],
  [1, 0],
  // [1, -1],
  [0, -1],
  // [-1, -1],
  [-1, 0],
  // [-1, 1],
];

export function solveA(input: string): number {
  const board = parse(input);
  const h = board.length;
  const w = board[0].length;
  const numberer = (y: number, x: number) => y * w + x;
  const denumberer = (i: number) => [Math.trunc(i / w), i % w];
  let next: Record<number, Set<number>> = {};
  let current: Record<number, Set<number>> = Object.fromEntries(
    board.flatMap((row, y) =>
      row.flatMap((cell, x) =>
        (cell == 9) ? [[numberer(y, x), new Set([numberer(y, x)])]] : []
      )
    ),
  );
  for (let iter = 9; iter > 0; iter--) {
    for (const [i, endsSet] of Object.entries(current)) {
      const [y, x] = denumberer(parseInt(i));
      for (const [dy, dx] of neighbourDeltas) {
        const [ny, nx] = [y + dy, x + dx];
        const ni = numberer(ny, nx);
        if (board[ny]?.[nx] === (iter - 1)) {
          next[ni] = (next[ni] ?? new Set()).union(endsSet);
        }
      }
    }
    current = next;
    next = [];
  }
  return Object.values(current).map((set) => set.size).reduce((a, b) => a + b);
}

export const testAnswerA = 36;

export function solveB(input: string): number {
  const board = parse(input);
  const h = board.length;
  const w = board[0].length;
  const numberer = (y: number, x: number) => y * w + x;
  const denumberer = (i: number) => [Math.trunc(i / w), i % w];
  let next: Record<number, number> = {};
  let current: Record<number, number> = Object.fromEntries(
    board.flatMap((row, y) =>
      row.flatMap((cell, x) => (cell == 9) ? [[numberer(y, x), 1]] : [])
    ),
  );
  for (let iter = 9; iter > 0; iter--) {
    for (const [i, upPaths] of Object.entries(current)) {
      const [y, x] = denumberer(parseInt(i));
      for (const [dy, dx] of neighbourDeltas) {
        const [ny, nx] = [y + dy, x + dx];
        const ni = numberer(ny, nx);
        if (board[ny]?.[nx] === (iter - 1)) {
          next[ni] = (next[ni] ?? 0) + upPaths;
        }
      }
    }
    current = next;
    next = [];
  }
  return Object.values(current).reduce((a, b) => a + b);
}

export const testAnswerB = 81;

Prelude.main(solveA, solveB);
