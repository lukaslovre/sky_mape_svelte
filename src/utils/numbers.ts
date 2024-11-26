export function formatWithCommas(number: number) {
  // format number to have commas every 3 digits
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// To be combined with a onInput to allow easier input of large numbers
// Ex. 15k -> 15000, 0.5k -> 500
const MULTIPLIERS = {
  k: 1000,
  m: 1000000,
} as const;

type Suffix = keyof typeof MULTIPLIERS;

export function parseValueWithSuffix<T>(value: T): T | string {
  if (typeof value !== "string") {
    return value;
  }

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return value;
  }

  const suffix = value.slice(-1).toLowerCase() as Suffix;

  if (!(suffix in MULTIPLIERS)) {
    return value;
  }

  return (numericValue * MULTIPLIERS[suffix]).toString();
}
