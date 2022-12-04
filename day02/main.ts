import { readTextFileFrom } from '../util.ts';

/*
 * Helpers
 */

type RockPaperScissorsMove = 'rock' | 'paper' | 'scissors';
type RockPaperScissorsOutcome = 'draw' | 'win' | 'lose';

const elfMoveCode: { [input: string] : RockPaperScissorsMove } = {
  'A': 'rock',
  'B': 'paper',
  'C': 'scissors',
};

const outcomeCode: { [input: string] : RockPaperScissorsOutcome } = {
  'X': 'lose',
  'Y': 'draw',
  'Z': 'win',
};

function decodeElfMove(encoded: string): RockPaperScissorsMove | undefined {
  return elfMoveCode[encoded];
}

function decodeOutcome(encoded: string): RockPaperScissorsOutcome | undefined {
  return outcomeCode[encoded];
}

function decideMyMove(theirMove: RockPaperScissorsMove, outcome: RockPaperScissorsOutcome): RockPaperScissorsMove | undefined {
  if (outcome === 'draw') {
    return theirMove;
  }

  if (theirMove === 'rock') {
    if (outcome === 'win') {
      return 'paper'
    }
    return 'scissors';
  }

  if (theirMove === 'paper') {
    if (outcome === 'win') {
      return 'scissors'
    }
    return 'rock';
  }

  if (theirMove === 'scissors') {
    if (outcome === 'win') {
      return 'rock'
    }
    return 'paper';
  }
}

/*
  Main program
 */

const input = await readTextFileFrom(import.meta.url, './input.txt');

let score = 0;

for (const roundStrategy of input.split('\n')) {
  const [elfMoveEncoded, outcomeEncoded] = roundStrategy.split(' ');
  const elfMove = decodeElfMove(elfMoveEncoded);
  const roundOutcome = decodeOutcome(outcomeEncoded);
  if (elfMove !== undefined && roundOutcome !== undefined) {
    let roundScore = 0;
    const myMove = decideMyMove(elfMove, roundOutcome);
    if (roundOutcome !== undefined) {
      if (roundOutcome === 'win') {
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
