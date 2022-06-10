export const shorterDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const distance = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;

  return distance;
};
