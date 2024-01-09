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
export function getQuestionPart(phrases: string[]): string[] {
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

// TEST_04
function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  const reachableNode: number[] = [...shops, ...stations, target];

  reachableNode.sort((a, b) => a - b);

  let energy = 0;
  let current = start;

  for (let i = 0; i < reachableNode.length; i++) {
    const distance = Math.abs(current - reachableNode[i]);
    const energyCost =
      stations.includes(current) && stations.includes(reachableNode[i])
        ? 0
        : distance;

    energy += energyCost;
    current = reachableNode[i];
  }

  return energy - 1;
}
