export function pickReloadVariant(key: string, count: number): number {
  let previous = -1;
  try {
    const stored = sessionStorage.getItem(key);
    if (stored !== null) previous = Number(stored);
  } catch {
    // Storage is optional; it only prevents consecutive repeats.
  }
  const choices = Array.from({ length: count }, (_, index) => index).filter(
    (index) => index !== previous,
  );
  const selected = choices[Math.floor(Math.random() * choices.length)] ?? 0;
  try {
    sessionStorage.setItem(key, String(selected));
  } catch {
    // Random selection still works when browser storage is unavailable.
  }
  return selected;
}
