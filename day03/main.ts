import { readTextFileFrom } from '../util.ts';

/*
 * Helpers
 */

interface ItemTypeInventory {
  // TODO: this can just be a boolean flag for seen
  [itemType: string]: number;
}

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

/*
 * Main program
 */

const input = await readTextFileFrom(import.meta.url, './input.txt');

let sumOfPriorities = 0;

for (const rucksack of input.split('\n')) {
  const itemTypes: ItemTypeInventory = {};
  let misplacedItemType: string | undefined;

  const compartmentSize = rucksack.length / 2;
  let i = 0;
  for (; i < compartmentSize; i++) {
    const item = rucksack[i];
    itemTypes[item] = 1;
  }
  for (; i < rucksack.length; i++) {
    const item = rucksack[i];
    if (itemTypes[item] !== undefined) {
      misplacedItemType = item;
      break;
    }
  }

  if (misplacedItemType === undefined) {
    console.error('No misplaced item found');
    break;
  }

  const priority = priorityOfItem(misplacedItemType);
  console.log(`Misplaced item: ${misplacedItemType}, priority: ${priority}`);

  sumOfPriorities += priority;
}

console.log(sumOfPriorities);
