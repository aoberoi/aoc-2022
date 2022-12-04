import { readTextFileFrom } from '../util.ts';

/*
 * Helpers
 */

function priorityOfItem(itemType: string): number {
  const characterCode = itemType.charCodeAt(0);

  // In JS, capital letters A-Z are in the range 65-90. Lower-case letters a-z are in the range 97-122
  if (characterCode >= 97 && characterCode < 123) {
    return characterCode - 96;
  } else if (characterCode >= 65 && characterCode < 91) {
    return characterCode - 38;
  }

  // The code should never reach here
  return 0;
}

function intersect<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter(i => b.has(i)));
}

/*
 * Main program
 */

const input = await readTextFileFrom(import.meta.url, './input.txt');

let sumOfPriorities = 0;

const rucksacks = input.split('\n');

// Group into groups of 3
const groups: string[][] = [];
rucksacks.forEach((rucksack, index) => {
  if (rucksack === '') {
    // Skip empty lines
    return;
  }
  const groupIndex = Math.floor(index / 3);
  if (groups[groupIndex] === undefined) {
    groups[groupIndex] = [rucksack];
  } else {
    groups[groupIndex].push(rucksack);
  }
});

for (const group of groups) {
  let commonItemTypes: Set<string> | undefined = undefined;

  for (const rucksack of group) {
    const itemTypes = new Set(rucksack);
    if (commonItemTypes === undefined) {
      // Initializes commonItemTypes set
      commonItemTypes = itemTypes;
    } else {
      // Eliminate commonItemTypes that are not in the current rucksack
      commonItemTypes = intersect(commonItemTypes, itemTypes);
    }
  }

  if (commonItemTypes === undefined || commonItemTypes.size !== 1) {
    console.error('Did not find one unique item across all rucksacks in group');
    break;
  }

  const badgeType = [...commonItemTypes][0];

  const priority = priorityOfItem(badgeType);

  sumOfPriorities += priority;
}

console.log(sumOfPriorities);
