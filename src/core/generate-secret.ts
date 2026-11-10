export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  throw new Error(`not implemented: ${length}, ${base}, ${random}`);
}
