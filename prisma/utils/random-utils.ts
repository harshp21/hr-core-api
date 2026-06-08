export function randomItem<T>(
  items: readonly T[],
): T {
  return items[
    Math.floor(Math.random() * items.length)
  ];
}

export function randomSalary(
  min = 30000,
  max = 300000,
): number {
  return Math.floor(
    Math.random() * (max - min) + min,
  );
}