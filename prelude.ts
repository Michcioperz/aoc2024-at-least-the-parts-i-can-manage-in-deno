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
