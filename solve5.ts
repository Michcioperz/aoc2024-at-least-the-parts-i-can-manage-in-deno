import * as Prelude from "./prelude.ts";

function parse(input: string): [[number, number][], number[][]] {
  const lines = input.split("\n").map((line) => line.trim());
  const splitIndex = lines.findIndex((line) => line == "");
  return [
    lines.slice(0, splitIndex).map((line) =>
      line.split("|").map((x) => parseInt(x)) as [number, number]
    ),
    lines.slice(splitIndex + 1).map((line) =>
      line.split(",").map((x) => parseInt(x))
    ),
  ];
}

export function solveA(input: string): number {
    const [orderPairs, runs] = parse(input);
    const orderings: Record<number, Set<number>> = {};
    for (const [before, after] of orderPairs) {
        (orderings[after] ??= new Set()).add(before);
    }
    let sum = 0;
    for (const run of runs) {
        const runSet = new Set(run);
        const done = new Set();
        for (const page of run) {
            // console.log(page, run, done, orderings);
            if (!(orderings[page] ?? new Set()).intersection(runSet).isSubsetOf(done)) break;

            done.add(page);
        }
        if (done.size == run.length) {
            sum += run[Math.trunc(run.length / 2)];
        }
    }
    return sum;
}

export const testAnswerA = 143;

export function solveB(input: string): number {
    const [orderPairs, runs] = parse(input);
    const orderings: Record<number, Set<number>> = {};
    for (const [before, after] of orderPairs) {
        (orderings[after] ??= new Set()).add(before);
    }
    let sum = 0;
    for (const run of runs) {
        const runSet = new Set(run);
        const done = new Set();
        for (const page of run) {
            // console.log(page, run, done, orderings);
            if (!(orderings[page] ?? new Set()).intersection(runSet).isSubsetOf(done)) break;

            done.add(page);
        }
        if (done.size != run.length) {
            const suborderings: Record<number, Set<number>> = {};
            const antiorderings: Record<number, Set<number>> = {};
            const q = new Prelude.UndyingQueue<number>();
            for (const page of run) {
                suborderings[page] = orderings[page]?.intersection(runSet) ?? new Set();
                if (suborderings[page].size < 1) {
                    q.push(page);
                } else {
                    for (const before of suborderings[page]) {
                        (antiorderings[before] ??= new Set()).add(page);
                    }
                }
            }
            const newRun = [];
            while (!q.empty()) {
                const page = q.pop();
                newRun.push(page);
                for (const after of antiorderings[page] ?? new Set()) {
                    suborderings[after].delete(page);
                    if (suborderings[after].size < 1)
                        q.push(after);
                }
            }
            sum += newRun[Math.trunc(newRun.length / 2)];
        }
    }
    return sum;
}

export const testAnswerB = 123;

Prelude.main(solveA, solveB);
