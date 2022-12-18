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

let overlappingAssignments = 0;

for (const pair of pairs) {
  if (pair === '') {
    continue;
  }

  const [[firstStart, firstEnd], [secondStart, secondEnd]] = parsePair(pair);

  if (
    (firstStart >= secondStart && firstStart <= secondEnd) ||
    (secondStart >= firstStart && secondStart <= firstEnd)
  ) {
    overlappingAssignments += 1;
  }
}

console.log(overlappingAssignments);
