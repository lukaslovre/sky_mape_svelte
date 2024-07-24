export function formatPrice(price: number) {
  // format price to have commas every 3 digits
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
