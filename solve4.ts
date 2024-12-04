import * as Prelude from "./prelude.ts";

const followups: [number, number][][] = [
  [[0, 1], [0, 2], [0, 3]],
  [[1, 1], [2, 2], [3, 3]],
  [[1, 0], [2, 0], [3, 0]],
  [[1, -1], [2, -2], [3, -3]],
  [[0, -1], [0, -2], [0, -3]],
  [[-1, -1], [-2, -2], [-3, -3]],
  [[-1, 0], [-2, 0], [-3, 0]],
  [[-1, 1], [-2, 2], [-3, 3]],
];

function parse(input: string): string[][] {
  return input.split("\n").map((s) => Array.from(s.trim()));
}

export function solveA(input: string): number {
  const board = parse(input);
  let count = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] == "X") {
        count += followups.map((followup) =>
          followup.map(([dx, dy]) =>
            (board[row + dx] ?? [])[col + dy]
          )
        ).filter(([m, a, s]) => m == "M" && a == "A" && s == "S").length;
      }
    }
  }
  return count;
}

export const testAnswerA = 18;

const diagonalSurroundings: [number, number][] = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

export function solveB(input: string): number {
  const board = parse(input);
  let count = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] == "A") {
        if (
          diagonalSurroundings.map(([x, y]) => (board[row + x] ?? [])[col + y])
            .toSorted().join("") == "MMSS"
        ) {
          if (
            new Set(
                diagonalSurroundings.filter(([x, y]) => x == 1).map(([x, y]) =>
                  (board[row + x] ?? [])[col + y]
                ),
              ).size == 1 ||
            new Set(
                diagonalSurroundings.filter(([x, y]) => y == 1).map(([x, y]) =>
                  (board[row + x] ?? [])[col + y]
                ),
              ).size == 1
          ) {
            count++;
          }
        }
      }
    }
  }
  return count;
}

export const testAnswerB = 9;

Prelude.main(solveA, solveB);
