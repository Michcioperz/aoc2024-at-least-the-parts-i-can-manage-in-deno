import * as Prelude from "./prelude.ts";

function parse(
  input: string,
  prizeDelta: number = 0,
): [number, number][][] {
  return input.trim().split("\n\n").map((machine) =>
    machine.split("\n").map(
      (line, idx) =>
        line.matchAll(/\d+/g).toArray().map((x) =>
          (idx == 2 ? prizeDelta : 0) + parseInt(x[0])
        ) as [
          number,
          number,
        ],
    )
  );
}

export function solveA(input: string): number {
  return parse(input).map((machine) => {
    let best = null;
    for (let a = 0; a <= 100; a++) {
      for (let b = 0; b <= 100; b++) {
        if (
          machine[0][0] * a + machine[1][0] * b == machine[2][0] &&
          machine[0][1] * a + machine[1][1] * b == machine[2][1] &&
          (best === null || (a * 3 + b < best))
        ) {
          best = a * 3 + b;
        }
      }
    }
    return best ?? 0;
  }).reduce((a, b) => a + b);
}

export const testAnswerA = 480;

export function solveB(input: string): number {
  return parse(input, 10000000000000).map(([[c, d], [e, f], [g, h]]) => {
    // apparently i'm so far removed from uni i can't solve a linear system without mathematica anymore
    const a = (f * g - e * h) / (c * f - d * e);
    const b = (d * g - c * h) / (d * e - c * f);
    if (((a % 1) != 0) || ((b % 1) != 0)) return 0;

    return a * 3 + b;
  }).reduce((a, b) => a + b);
}

Prelude.main(solveA, solveB);
