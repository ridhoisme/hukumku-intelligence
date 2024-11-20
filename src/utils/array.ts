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

type DataItem = {
  name: string;
  info: string;
  id: string;
};

export type TransformedData = {
  lawyer_name: string;
  granted: number;
  partially: number;
  rejected: number;
  total_cases: number;
  id: string;
};

export const transformDataLawyer = (data: DataItem[]): TransformedData[] => {
  const categories = [
    "Dikabulkan Total",
    "Dikabulkan Sebagian",
    "Ditolak",
  ] as const;
  const keyMapping: Record<
    (typeof categories)[number],
    keyof Omit<TransformedData, "lawyer_name" | "id">
  > = {
    "Dikabulkan Total": "granted",
    "Dikabulkan Sebagian": "partially",
    Ditolak: "rejected",
  };

  const groupedData = data.reduce<
    Record<string, { counts: Record<string, number>; id: string }>
  >((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { counts: {}, id: item.id };
    }
    acc[item.name].counts[item.info] =
      (acc[item.name].counts[item.info] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(groupedData).map(([lawyer_name, { counts, id }]) => {
    const transformedEntry: TransformedData = {
      id,
      lawyer_name,
      granted: 0,
      partially: 0,
      rejected: 0,
      total_cases: 0,
    };

    categories.forEach((category) => {
      const newKey = keyMapping[category];
      transformedEntry[newKey] = counts[category] || 0;
    });

    transformedEntry.total_cases =
      transformedEntry.granted +
      transformedEntry.partially +
      transformedEntry.rejected;

    return transformedEntry;
  });
};
