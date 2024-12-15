import { join } from "@std/path/join";
import { daysThatHaveInputs } from "./prelude.ts";
import { assertEquals } from "@std/assert";

for (const day of daysThatHaveInputs()) {
  Deno.test(`day ${day}`, async (t) => {
    const testInputs = Array.from(Deno.readDirSync("inputs")).filter((file) =>
      file.name.startsWith(`${day}.`) && file.name.endsWith(".input") &&
      file.name != `${day}.input`
    );
    const solution = await import(`./solve${day}.ts`);
    for (const inputName of testInputs) {
      const input = await Deno.readTextFile(join("inputs", inputName.name));
      const infix = inputName.name.match(/\.([^\.]+)\.input/)![1];
      if ("solveA" in solution) {
        await t.step(
          "solveA",
          `${infix}AnswerA` in solution
          ? async (t) => {
            assertEquals(await solution.solveA(input), solution[`${infix}AnswerA`]);
          }
          : async (t) => {
            console.log(await solution.solveA(input));
          },
        );
      }
      if ("solveB" in solution) {
        await t.step(
          "solveB",
          `${infix}AnswerB` in solution
          ? async (t) => {
            assertEquals(await solution.solveB(input), solution[`${infix}AnswerB`]);
          }
          : async (t) => {
            console.log(await solution.solveB(input));
          },
        );
      }
    }
  });
}
