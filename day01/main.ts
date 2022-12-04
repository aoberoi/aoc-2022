import { fromFileUrl, dirname, resolve } from "https://deno.land/std@0.167.0/path/mod.ts";

const path = pathBasedOnCurrentFile('./input.txt');

// TODO: maybe we could handle this as a stream instead of reading into memory all at once
const input = await Deno.readTextFile(path);

// Initialize state
let maxCaloriesCarriedByElf = 0;
let caloriesCarriedByCurrentElf = 0;

for (const line of input.split('\n')) {

  if (line.length === 0) {
    // End of current elf
    maxCaloriesCarriedByElf = Math.max(maxCaloriesCarriedByElf, caloriesCarriedByCurrentElf);
    caloriesCarriedByCurrentElf = 0;
    continue;
  }

  // Accumulate
  const calories = Number(line);
  if (!Number.isNaN(calories)) {
    caloriesCarriedByCurrentElf += calories;
  }
}

// In case we don't end on a blank line, we need to compare one more time
maxCaloriesCarriedByElf = Math.max(maxCaloriesCarriedByElf, caloriesCarriedByCurrentElf);

// Print answer
console.log(maxCaloriesCarriedByElf);

/*
 * Utils
 */

function pathBasedOnCurrentFile(relativePath: string): string {
  return resolve(dirname(fromFileUrl(import.meta.url)), relativePath);
}
