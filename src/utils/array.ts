export function getMostFrequentValue(arr: string[]): string | null {
  if (arr.length === 0) return null;

  const frequencyMap: Record<string, number> = {};
  let mostFrequent = arr[0];
  let maxCount = 1;

  for (const str of arr) {
    frequencyMap[str] = (frequencyMap[str] || 0) + 1;
    if (frequencyMap[str] > maxCount) {
      mostFrequent = str;
      maxCount = frequencyMap[str];
    }
  }

  return mostFrequent;
}
