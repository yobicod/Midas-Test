// TEST 01
function getClockAngle(hh_mm: string): number {
  const [hours, minutes] = hh_mm.split(':').map(Number);

  const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;

  const minuteAngle = minutes * 6;

  let angleDiff = Math.abs(hourAngle - minuteAngle);

  if (angleDiff > 180) {
    angleDiff = 360 - angleDiff;
  }

  return angleDiff;
}

// TEST_02
function getQuestionPart(phrases: string[]): string[] {
  const possibleAnswer: string[] = [];

  phrases.forEach((phrase) => {
    for (let i = 0; i < phrase.length; i++) {
      let compareString: string = '';
      compareString += phrase[i];
      for (let j = i + 1; j < phrase.length; j++) {
        compareString += phrase[j];

        if (phrases.every((p) => p.includes(compareString))) {
          possibleAnswer.push(compareString);
        }
      }
    }
  });

  const duplicateWord = findMaxLengthString(possibleAnswer);

  return phrases.map((phrase) => phrase.replace(duplicateWord, ''));
}

function findMaxLengthString(arr: string[]): string {
  let maxLengthString = '';

  for (const str of arr) {
    if (str.length > maxLengthString.length) {
      maxLengthString = str;
    }
  }
  return maxLengthString;
}

type Board = {
  ladders: [number, number][];
  snakes: [number, number][];
};

// TEST_03
function quickestPath(board: Board): number[] {
  const { ladders, snakes } = board;
  const visited = new Map<number, number>();

  const queue: [number[], number][] = [[[], 1]]; // Start from position 1

  while (queue.length > 0) {
    const [path, currentPosition] = queue.shift()!;
    const currentRolls = path.length;

    if (
      !visited.has(currentPosition) ||
      visited.get(currentPosition)! > currentRolls
    ) {
      visited.set(currentPosition, currentRolls);

      if (currentPosition === 100) {
        return path;
      }

      for (let roll = 1; roll <= 6; roll++) {
        const nextPosition = currentPosition + roll;

        let nextPath = [...path, roll];
        const connection = ladders
          .concat(snakes)
          .find(([start]) => start === nextPosition);
        const connectedPosition = connection ? connection[1] : nextPosition;

        if (
          !visited.has(connectedPosition) ||
          visited.get(connectedPosition)! > nextPath.length
        ) {
          queue.push([nextPath, connectedPosition]);
        }
      }
    }
  }

  return [];
}

// TEST_04
function minEnergy(
  start: number,
  shops: number[],
  busStops: number[],
  target: number
): number {
  const energySoFar: number[] = new Array(target + 1).fill(Infinity);
  energySoFar[start] = 0;

  for (let i = start + 1; i <= target; i++) {
    energySoFar[i] = Math.min(energySoFar[i], energySoFar[i - 1] + 1);

    for (const busStop of busStops) {
      if (busStop <= i && i - busStop <= 2) {
        const busCost = energySoFar[busStop] + 1;
        energySoFar[i] = Math.min(energySoFar[i], busCost);
      }
    }

    if (shops.includes(i)) {
      energySoFar[i] = Math.min(energySoFar[i], energySoFar[i - 1] + 1);
    }
  }

  return energySoFar[target];
}
