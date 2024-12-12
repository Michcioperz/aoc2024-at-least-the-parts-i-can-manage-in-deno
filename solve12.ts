import * as Prelude from "./prelude.ts";

function parse<T>(input: string, ini: (ch: string) => T): T[][] {
  return input.trim().split("\n").map((line) =>
    Array.from(line.trim()).map(ini)
  );
}

const directions: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export function solveA(input: string): number {
  const board = parse(
    input,
    (field) => [field, null] as [field: string, component: number | null],
  );
  const h = board.length;
  const w = board[0].length;
  const numberer = (y: number, x: number) => y * w + x;
  const componentStats: [area: number, internalFencesCountedTwice: number][] =
    [];
  const dfs = (y: number, x: number, component: number) => {
    if (board[y][x][1] === null) {
      board[y][x][1] = component;
      const field = board[y][x][0];
      const componentStat = componentStats[component];
      componentStat[0]++;
      for (const direction of directions) {
        const [ny, nx] = [y + direction[0], x + direction[1]];
        if (board[ny]?.[nx]?.[0] == field) {
          componentStat[1]++;
          dfs(ny, nx, component);
        }
      }
    }
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (board[y][x][1] === null) {
        const component = componentStats.length;
        componentStats.push([0, 0]);
        dfs(y, x, component);
      }
    }
  }
  return componentStats.map(([area, internalFencesCountedTwice]) =>
    area * (area * 4 - internalFencesCountedTwice)
  ).reduce((a, b) => a + b);
}

export const testAnswerA = 1930;

export function solveB(input: string): number {
  const board = parse(
    input,
    (field) => [field, null] as [field: string, component: number | null],
  );
  const h = board.length;
  const w = board[0].length;
  const numberer = (y: number, x: number) => y * w + x;
  const componentStats: [area: number, walls: number][] = [];
  const dfs1 = (y: number, x: number, component: number) => {
    if (board[y][x][1] === null) {
      board[y][x][1] = component;
      const field = board[y][x][0];
      const componentStat = componentStats[component];
      componentStat[0]++;
      for (const direction of directions) {
        const [ny, nx] = [y + direction[0], x + direction[1]];
        if (board[ny]?.[nx]?.[0] == field) {
          dfs1(ny, nx, component);
        }
      }
    }
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (board[y][x][1] === null) {
        const component = componentStats.length;
        componentStats.push([0, 0]);
        dfs1(y, x, component);
      }
    }
  }
  for (let y = 0; y < h; y++) {
    for (const delta of [-1, 1]) {
      let lastComponent = null, lastWall = false;
      for (let x = 0; x < w; x++) {
        const component = board[y][x][1]!;
        const wall = board[y + delta]?.[x]?.[1] != component;

        if ((lastComponent != component || lastWall != wall) && wall) {
          componentStats[component][1]++;
        }

        lastComponent = component;
        lastWall = wall;
      }
    }
  }
  for (let x = 0; x < w; x++) {
    for (const delta of [-1, 1]) {
      let lastComponent = null, lastWall = false;
      for (let y = 0; y < h; y++) {
        const component = board[y][x][1]!;
        const wall = board[y][x + delta]?.[1] != component;

        if ((lastComponent != component || lastWall != wall) && wall) {
          componentStats[component][1]++;
        }

        lastComponent = component;
        lastWall = wall;
      }
    }
  }
  return componentStats.map(([area, sides]) => area * sides).reduce((a, b) =>
    a + b
  );
}

export const testAnswerB = 1206;

Prelude.main(solveA, solveB);
