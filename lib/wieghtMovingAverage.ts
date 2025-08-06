export const weightedMovingAverage = (
  data: number[],
  weights: number[]
): number[] => {
  const n = weights.length;
  const forecast: number[] = [];

  for (let i = n; i <= data.length; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += data[i - j - 1] * weights[j];
    }
    forecast.push(sum);
  }

  return forecast;
};
