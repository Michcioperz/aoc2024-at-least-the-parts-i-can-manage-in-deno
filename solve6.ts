import * as Prelude from "./prelude.ts";

function parse(input: string): [boolean[][], readonly [number, number]] {
  let startY: number, startX: number;
  return [
    input.trim().split("\n").map((s, row) =>
      Array.from(s.trim()).map((ch, col) => {
        if (ch == "^") {
          startY = row;
          startX = col;
        } else if (ch == "#") {
          return true;
        }
        return false;
      })
    ),
    [startY!, startX!],
  ];
}

const directions: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export function solveA(input: string): number {
  let [board, pos] = parse(input);
  const height = board.length;
  const width = board[0].length;
  const visited = new Set<number>();
  let rotation = 0;
  while (pos[0] >= 0 && pos[0] < height && pos[1] >= 0 && pos[1] < width) {
    // console.log(pos);
    visited.add(pos[0] * width + pos[1]);
    const delta = directions[rotation];
    const nextPos: [number, number] = [pos[0] + delta[0], pos[1] + delta[1]];
    if (board[nextPos[0]]?.[nextPos[1]] ?? false) {
      rotation = (rotation + 1) % 4;
    } else {
      pos = nextPos;
    }
  }
  return visited.size;
}

export const testAnswerA = 41;

export function solveB(input: string): number {
  const [board, startPos] = parse(input);
  const height = board.length;
  const width = board[0].length;
  let solutions = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (board[y][x]) continue;
      if (y == startPos[0] && x == startPos[1]) continue;
      board[y][x] = true;
      let pos = startPos;
      const visited = new Set<number>();
      let rotation = 0;
      let winning = false;
      while (pos[0] >= 0 && pos[0] < height && pos[1] >= 0 && pos[1] < width) {
        // console.log(pos);
        const posRotHash = (pos[0] * width + pos[1]) * 4 + rotation;
        if (visited.has(posRotHash)) {
          winning = true;
          break;
        }
        visited.add(posRotHash);
        const delta = directions[rotation];
        const nextPos: readonly [number, number] = [
          pos[0] + delta[0],
          pos[1] + delta[1],
        ];
        if (board[nextPos[0]]?.[nextPos[1]] ?? false) {
          rotation = (rotation + 1) % 4;
        } else {
          pos = nextPos;
        }
      }
      board[y][x] = false;
      if (winning) solutions++;
    }
  }
  return solutions;
}

export const testAnswerB = 6;

Prelude.main(solveA, solveB);
