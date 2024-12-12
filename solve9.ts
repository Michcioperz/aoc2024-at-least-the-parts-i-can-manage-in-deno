import * as Prelude from "./prelude.ts";

export function solveA(input: string): number {
    const diskmap = Array.from(input.trim()).flatMap((x, i) => Array(parseInt(x)).fill((i & 1) ? null : i / 2));
    let checksum = 0;
    for (let i = 0; i < diskmap.length; i++) {
        while (diskmap[diskmap.length - 1] === null) diskmap.pop();
        while (diskmap[i] === null) {
            diskmap[i] = diskmap.pop();
        }
        while (diskmap[diskmap.length - 1] === null) diskmap.pop();
        checksum += i * diskmap[i];
    }
    return checksum;
}

export const testAnswerA = 1928;

export function solveB(input: string): number {
    const files: [start:number,len:number][] = [];
    let start = 0;
    Array.from(input.trim()).forEach((x, i) => {
        const len = parseInt(x);
        if ((i & 1) == 0) {
            const fileId = i / 2;
            files.push([start, len]);
        }
        start += len;
    });
    const fileCount = files.length;
    for (let fileId = fileCount - 1; fileId > 0; fileId--) {
        if ((fileId&127)==0)console.log(fileId);
        const [start, len] = files[fileId];
        let minStart = start;
        for (const [otherStart, otherLen] of files) {
            const newStart = otherStart+otherLen;
            if (otherStart+otherLen >= minStart) continue;
            if (files.every(([otherStart, otherLen]) => !rangesCollide(newStart, len, otherStart, otherLen))) {
                minStart = newStart;
            }
        }
        files[fileId][0] = minStart;
    }

    let checksum = 0;
    for (let fileId = 0; fileId < fileCount; fileId++) {
        const [start, len] = files[fileId];
        checksum += fileId * ((start+start+len-1)*len/2);
    }
    return checksum;
}

export const testAnswerB = 2858;

function rangesCollide(lhsStart: number, lhsLen: number, rhsStart: number, rhsLen: number): boolean {
    return Math.min(lhsStart+lhsLen, rhsStart+rhsLen)>Math.max(lhsStart, rhsStart)
}

Prelude.main(solveA, solveB);
