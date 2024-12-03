import { join } from "@std/path/join";
import { daysThatHaveInputs } from "./prelude.ts";
import { assertEquals } from "@std/assert";

for (const day of daysThatHaveInputs()) {
  Deno.test(`day ${day}`, async (t) => {
    const input = (await Deno.readTextFile(join("inputs", `${day}.test.input`)))
      .trim();
    const solution = await import(`./solve${day}.ts`);
    if ("solveA" in solution) {
      await t.step(
        "solveA",
        "testAnswerA" in solution
          ? async (t) => {
            assertEquals(await solution.solveA(input), solution.testAnswerA);
          }
          : async (t) => {
            console.log(await solution.solveA(input));
          },
      );
    }
    if ("solveB" in solution) {
      await t.step(
        "solveB",
        "testAnswerB" in solution
          ? async (t) => {
            assertEquals(await solution.solveB(input), solution.testAnswerB);
          }
          : async (t) => {
            console.log(await solution.solveB(input));
          },
      );
    }
  });
}
