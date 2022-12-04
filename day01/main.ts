import { readTextFileFrom } from '../util.ts';

const input = await readTextFileFrom(import.meta.url, './input.txt');

// Initialize state
const caloriesCarriedByEachElf: number[] = [];
let caloriesCarriedByCurrentElf = 0;

for (const line of input.split('\n')) {

  if (line.length === 0) {
    // End of current elf
    caloriesCarriedByEachElf.push(caloriesCarriedByCurrentElf);
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
caloriesCarriedByEachElf.push(caloriesCarriedByCurrentElf);

// Find the sum from the top 3
const answer = caloriesCarriedByEachElf.sort((a, b) => b - a).slice(0, 3).reduce((a, c) => a + c, 0);

// Print answer
console.log(answer);
