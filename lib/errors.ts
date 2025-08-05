export const meanAbsolutePercentageError = (
  actual: number[],
  forecast: number[]
): number => {
  const errors = actual.map((a, i) => Math.abs((a - forecast[i]) / a));
  return (errors.reduce((acc, e) => acc + e, 0) / errors.length) * 100;
};

export const meanAbsoluteError = (
  actual: number[],
  forecast: number[]
): number => {
  const errors = actual.map((a, i) => Math.abs(a - forecast[i]));
  return errors.reduce((acc, e) => acc + e, 0) / errors.length;
};
