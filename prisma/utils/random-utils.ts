export function randomItem<T>(
  items: readonly T[],
): T {
  return items[
    Math.floor(Math.random() * items.length)
  ];
}

export function randomSalary(): number {
  return Math.floor(
    Math.random() * (300000 - 30000) + 30000,
  );
}