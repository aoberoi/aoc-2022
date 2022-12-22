import { readTextFileFrom } from '../util.ts';

/*
 * Helpers
 */

type Stack = string[];
interface Stacks {
  [key: string]: Stack;
}

function parseStackState(stackState: string): Stacks {

  const lines = stackState.split('\n');

  // Initialize stacks by looking at the last line
  const stacks: Stacks = {};
  const lastLine = lines[lines.length - 1];
  for (const match of lastLine.matchAll(/\s+(\d+)/g)) {
    const key = match[1];
    stacks[key] = [];
  }

  // Iterate over lines in reverse order to build the stacks
  for (let i = lines.length - 2; i >= 0; i--) {
    let keyIndex = 0;
    for (const match of lines[i].matchAll(/(\s*)\[(\w)\]/g)) {
      // Skip ahead based on leading whitespace
      keyIndex += Math.floor(match[1].length / 4);
      const key = (keyIndex + 1).toString();
      stacks[key].push(match[2]);
      keyIndex += 1;
    }
  }

  return stacks;
}

interface Step {
  quantity: number;
  source: string;
  destination: string;
}

function parseStep(step: string): Step {
  const match = /move (\d+) from (\S+) to (\S+)/g.exec(step);
  if (match === null) {
    throw new Error('Could not parse step');
  }
  return {
    quantity: Number(match[1]),
    source: match[2],
    destination: match[3],
  };
}

/*
 * Main program
 */

const input = await readTextFileFrom(import.meta.url, './input.txt');

const [initialStackState, rearrangementProcedure] = input.split('\n\n');

const stacks = parseStackState(initialStackState);

const steps = rearrangementProcedure.split('\n');

// Execute the procedure
for (const step of steps) {
  if (step === '') continue;

  const parsedStep = parseStep(step);

  for (let i = 0; i < parsedStep.quantity; i++) {
    const crate = stacks[parsedStep.source].pop();
    if (crate !== undefined) {
      stacks[parsedStep.destination].push(crate);
    }
  }
}

// Find the top crate on each stack
const topCrates = Object.values(stacks).reduce((prev, stack) => {
  return prev + stack.at(-1);
}, '');
console.log(topCrates);
