import QS from "qs";

export type QueryParams = {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | null
    | QueryParams
    | QueryParams[];
};

export const qs = (params: QueryParams): string => {
  if (!params || typeof params !== "object") return "";

  // Use qs to build the query string
  const queryString = QS.stringify(params, {
    encode: true,
    addQueryPrefix: true,
    encodeValuesOnly: true,
  });

  return queryString;
};
