import * as Prelude from "./prelude.ts";

function parse(
  input: string,
): [
  robots: [sx: number, sy: number, vx: number, vy: number][],
  board: [w: number, h: number],
] {
  const robots = input.trim().split("\n").map((line) =>
    line.matchAll(/-?\d+/g).toArray().map((x) => parseInt(x[0])) as [number, number, number, number]
  );
  return [robots, robots.length > 12 ? [101, 103] : [11, 7]]
}

export function solveA(input: string): number {
    const iters = 100;
    const [robots, [w, h]] = parse(input);
    const [midx, midy] = [Math.trunc(w/2), Math.trunc(h/2)];
    const quadrants = [0, 0, 0, 0];
    for (const [sx, sy, vx, vy] of robots) {
        const ex = ((sx + vx * iters) % w + w) % w;
        const ey = ((sy + vy * iters) % h + h) % h;
        if (ex < midx && ey < midy) quadrants[0]++
        if (ex < midx && ey > midy) quadrants[1]++
        if (ex > midx && ey < midy) quadrants[2]++
        if (ex > midx && ey > midy) quadrants[3]++
    }
    return quadrants.reduce((a,b)=>a*b);
}

export const testAnswerA = 12;

function displayB(input: string): number {
    const [robots, [w, h]] = parse(input);
    let iters = 0;
    do {
        iters++;
        const board = Array(h).fill(0).map(_=>Array(w).fill(" "));
        for (const [sx, sy, vx, vy] of robots) {
            const ex = ((sx + vx * iters) % w + w) % w;
            const ey = ((sy + vy * iters) % h + h) % h;
            board[ey][ex] = "X";
        }
        console.log(iters);
        console.log(board.map(line => line.join("")).join("\n"));
    } while (iters < 10000);
    return iters;
}
function solveB(input:string): number {
    // 70+101n = 19+103m
    for (let i = 70; i < 10000; i++) {
        if ((i-70) % 101 == 0 && (i-19) % 103 == 0) return i;
    }
}

Prelude.main(solveA, solveB);
