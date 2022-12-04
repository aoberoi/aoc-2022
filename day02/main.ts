import { readTextFileFrom } from '../util.ts';

/*
 * Helpers
 */

type RockPaperScissorsMove = 'rock' | 'paper' | 'scissors';

const elfMoveCode: { [input: string] : RockPaperScissorsMove } = {
  'A': 'rock',
  'B': 'paper',
  'C': 'scissors',
};

const myMoveCode: { [input: string] : RockPaperScissorsMove } = {
  'X': 'rock',
  'Y': 'paper',
  'Z': 'scissors',
};

function decodeElfMove(encoded: string): RockPaperScissorsMove | undefined {
  return elfMoveCode[encoded];
}

function decodeMyMove(encoded: string): RockPaperScissorsMove | undefined {
  return myMoveCode[encoded];
}

function rockPaperScissorsWinner(firstPlayer: RockPaperScissorsMove, secondPlayer: RockPaperScissorsMove): 'draw' | 'first' | 'second' | undefined {
  if (firstPlayer === secondPlayer) {
    return 'draw';
  }
  if (firstPlayer === 'rock') {
    if (secondPlayer === 'paper') {
      return 'second';
    } else {
      return 'first';
    }
  } else if (firstPlayer === 'paper') {
    if (secondPlayer === 'rock') {
      return 'first';
    } else {
      return 'second';
    }
  } else if (firstPlayer === 'scissors') {
    if (secondPlayer == 'rock') {
      return 'second';
    } else {
      return 'first';
    }
  }
}

/*
  Main program
 */

const input = await readTextFileFrom(import.meta.url, './input.txt');

let score = 0;

for (const roundStrategy of input.split('\n')) {
  const [elfMoveEncoded, myMoveEncoded] = roundStrategy.split(' ');
  const elfMove = decodeElfMove(elfMoveEncoded);
  const myMove = decodeMyMove(myMoveEncoded);
  if (elfMove !== undefined && myMove !== undefined) {
    let roundScore = 0;
    const roundOutcome = rockPaperScissorsWinner(myMove, elfMove);
    if (roundOutcome !== undefined) {
      if (roundOutcome === 'first') {
        roundScore += 6;
      } else if (roundOutcome === 'draw') {
        roundScore += 3;
      }
    }
    if (myMove === 'rock') {
      roundScore += 1;
    } else if (myMove === 'paper') {
      roundScore += 2;
    } else if (myMove === 'scissors') {
      roundScore += 3;
    }
    score += roundScore;
  }
}

console.log(score);
