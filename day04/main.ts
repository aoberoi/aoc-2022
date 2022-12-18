import { readTextFileFrom } from '../util.ts';

/*
 * Helpers
 */

type Assignment = [start: number, end: number];

function parsePair(pair: string): [first: Assignment, second: Assignment] {
  const [first, second] = pair.split(',');
  return [parseAssignment(first), parseAssignment(second)];
}

function parseAssignment(assignment: string): Assignment {
  const [startStr, endStr] = assignment.split('-');
  return [Number.parseInt(startStr), Number.parseInt(endStr)];
}

/*
 * Main program
 */

const input = await readTextFileFrom(import.meta.url, './input.txt');

const pairs = input.split('\n');

let fullyContainedAssignments = 0;

for (const pair of pairs) {
  if (pair === '') {
    console.log('skip');
    continue;
  }

  const [[firstStart, firstEnd], [secondStart, secondEnd]] = parsePair(pair);

  if (
    // firstAssignment is fully contained in secondAssignment
    (firstStart >= secondStart && firstStart <= secondEnd &&
    firstEnd >= secondStart && firstEnd <= secondEnd) ||
    // secondAssignment is fully contained in firstAssignment
    (secondStart >= firstStart && secondStart <= firstEnd &&
    secondEnd >= firstStart && secondEnd <= firstEnd)
  ) {
    fullyContainedAssignments += 1;
    console.log(`Fully contained: ${pair}`)
  } else {
    console.log(`Not fully contained: ${pair}`);
  }
}

console.log(fullyContainedAssignments);
