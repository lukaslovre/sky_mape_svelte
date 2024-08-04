export function formatWithCommas(number: number) {
  // format number to have commas every 3 digits
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
