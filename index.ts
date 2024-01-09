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
