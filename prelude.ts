import { basename, join } from "jsr:@std/path@1";

export function dayBeingSolved(): number {
  return parseInt(basename(Deno.mainModule).match(/\d+/)![0]);
}

export function daysThatHaveInputs(): number[] {
  return Array.from(Deno.readDirSync("inputs")).filter((entry) =>
    entry.name.endsWith(".input") && !entry.name.endsWith(".test.input")
  ).map((entry) => parseInt(entry.name.split(".")[0]));
}

export function main(...funs: ((input: string) => number)[]) {
  if (basename(Deno.mainModule).startsWith("solve")) {
    const input = Deno.readTextFileSync(
      join("inputs", `${dayBeingSolved()}.input`),
    ).trim();
    for (const fun of funs) {
      console.log(fun(input));
    }
  }
}

export function dbg(x: any): any {
  console.log(x);
  return x;
}

/// array-backed queue that never deallocates
export class UndyingQueue<T> {
  private array: T[] = [];
  private head: number = 0;
  push(item: T): void {
    this.array.push(item);
  }
  empty(): boolean {
    return this.head >= this.array.length;
  }
  pop(): T {
    if (this.empty()) throw new Error("popping empty queue");

    return this.array[this.head++];
  }
}

export function* range(
  start: number,
  stop: number,
  step: number = 1,
): Generator<number, void, unknown> {
  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i > stop; i += step) {
      yield i;
    }
  }
}

export interface Numberizer<T> {
  numberize(t: T): number;
  denumberize(n: number): T;
}

export class NumberizedSet<T, Converter extends Numberizer<T>> {
  readonly converter: Converter;
  private set: Set<number>;
  constructor(converter: Converter, source: Iterable<T> = []) {
    this.converter = converter;
    this.set = new Set();
    for (const item of source) {
      this.set.add(converter.numberize(item));
    }
  }
}
