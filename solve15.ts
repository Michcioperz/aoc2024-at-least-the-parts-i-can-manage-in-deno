import * as Prelude from "./prelude.ts";

const ROBOT = "@";
const WALL = "#";
const BOX = "O";
const SPACE = ".";
type filling = typeof ROBOT | typeof WALL | typeof BOX | typeof SPACE;
const BOX_LEFT = "[";
const BOX_RIGHT = "]";
type filling2 =
  | typeof ROBOT
  | typeof WALL
  | typeof BOX_LEFT
  | typeof BOX_RIGHT
  | typeof SPACE;

const wiiide: Record<filling, filling2[]> = {
  "@": ["@", "."],
  "O": ["[", "]"],
  ".": [".", "."],
  "#": ["#", "#"],
};

const moves: Record<"<" | "^" | ">" | "v", [number, number]> = {
  "<": [0, -1],
  ">": [0, 1],
  "^": [-1, 0],
  "v": [1, 0],
};

function parse(input: string): [filling[][], [number, number][]] {
  const [boardS, movesS] = input.trim().split("\n\n");
  return [
    boardS.split("\n").map((line) => Array.from(line.trim()) as filling[]),
    (Array.from(movesS.replaceAll(/\s/g, "")) as (keyof typeof moves)[]).map(
      (x) => moves[x],
    ),
  ];
}

function parse2(input: string): [filling2[][], [number, number][]] {
  const [boardS, movesS] = input.trim().split("\n\n");
  return [
    boardS.split("\n").map((line) =>
      (Array.from(line.trim()) as filling[]).flatMap((x) => wiiide[x])
    ),
    (Array.from(movesS.replaceAll(/\s/g, "")) as (keyof typeof moves)[]).map(
      (x) => moves[x],
    ),
  ];
}

export function solveA(input: string): number {
  const [board, moves] = parse(input);
  let [y, x]: [number, number] = board.entries().map(([y, line]) =>
    [y, line.findIndex((x) => x == ROBOT)] as [number, number]
  ).find(([y, x]) => x !== -1)!;
  for (const move of moves) {
    const swapQueue: [number, number][] = [[y, x]];
    while (
      "@O".includes(
        board[swapQueue[swapQueue.length - 1][0]][
          swapQueue[swapQueue.length - 1][1]
        ],
      )
    ) {
      swapQueue.push([
        swapQueue[swapQueue.length - 1][0] + move[0],
        swapQueue[swapQueue.length - 1][1] + move[1],
      ]);
    }
    if (
      board[swapQueue[swapQueue.length - 1][0]][
        swapQueue[swapQueue.length - 1][1]
      ] == SPACE
    ) {
      swapQueue.reduceRight((last, next) => {
        [board[last[0]][last[1]], board[next[0]][next[1]]] = [
          board[next[0]][next[1]],
          board[last[0]][last[1]],
        ];
        return next;
      });
      [y, x] = [y + move[0], x + move[1]];
    }
  }
  return board.map((line, y) =>
    line.flatMap((cell, x) => cell == BOX ? [y * 100 + x] : []).reduce(
      (a, b) => a + b,
      0,
    )
  ).reduce((a, b) => a + b);
}

// export function solveB(input: string): number {
//   const [board, moves] = parse2(input);
//   let [y, x]: [number, number] = board.entries().map(([y, line]) =>
//     [y, line.findIndex((x) => x == ROBOT)] as [number, number]
//   ).find(([y, x]) => x !== -1)!;
//   for (const move of moves) {
//     const swapQueue: [number, number][][] = [[[y, x]]];
//     while (
//       swapQueue[swapQueue.length-1].every(([y,x]) => board[y][x]!=WALL) && !swapQueue[swapQueue.length-1].every(([y,x])=>board[y][x]!=SPACE)
//     ) {
//         const newLine = swapQueue[swapQueue.length - 1].map(([y,x]) => [y+move[0], x+move[1]]);
//       swapQueue.push(newLine);
//       if (board[newLine[0][0]][newLine[0][1]] == "")
//     }
//     if (
//       board[swapQueue[swapQueue.length - 1][0]][
//         swapQueue[swapQueue.length - 1][1]
//       ] == SPACE
//     ) {
//       swapQueue.reduceRight((last, next) => {
//         [board[last[0]][last[1]], board[next[0]][next[1]]] = [
//           board[next[0]][next[1]],
//           board[last[0]][last[1]],
//         ];
//         return next;
//       });
//       [y, x] = [y + move[0], x + move[1]];
//     }
//   }
//   return board.map((line, y) =>
//     line.flatMap((cell, x) => cell == BOX ? [y * 100 + x] : []).reduce(
//       (a, b) => a + b,
//       0,
//     )
//   ).reduce((a, b) => a + b);
// }

export const testAnswerA = 2028;
export const bigAnswerA = 10092;
export const bigAnswerB = 9021;

Prelude.main(solveA);
