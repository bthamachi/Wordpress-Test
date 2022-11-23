export const random_sample = (arr: any[], size: number): any[] => {
  return arr
    .map((a) => [a, Math.random()])
    .sort((a, b) => {
      return a[1] < b[1] ? -1 : 1;
    })
    .slice(0, size)
    .map((a) => a[0]);
};
