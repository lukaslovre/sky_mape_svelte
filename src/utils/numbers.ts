export function formatWithCommas(number: number) {
  // format number to have commas every 3 digits, eg. 1000000 -> 1,000,000, 1000 -> 1,000
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

export function bytesToHumanReadable(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 Byte";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}
