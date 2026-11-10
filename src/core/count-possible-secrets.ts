export function createMemoizedCountPossibleSecrets(): (
  length: number,
  base: number,
) => number {
  const cache = new Map<string, number>();

  const count = (length: number, base: number): number => {
    if (length === 0) {
      return 1;
    }

    if (length < 0 || base < 0 || length > base) {
      return 0;
    }

    const key = `${length}:${base}`;
    const cached = cache.get(key);

    if (cached !== undefined) {
      return cached;
    }

    const result = base * count(length - 1, base - 1);
    cache.set(key, result);
    return result;
  };

  return count;
}

export const countPossibleSecrets = createMemoizedCountPossibleSecrets();
