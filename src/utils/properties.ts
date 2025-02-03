import type { Property } from "../types";
import { formatWithCommas } from "./numbers";
import { parsePaymentFrequency } from "./paymentFrequency";

export function sortProperties(
  properties: Property[],
  sortByAttribute: keyof Property | null
): Property[] {
  if (sortByAttribute === null) return properties;
  if (properties.length === 0) return properties;

  const sortedProperties = [...properties];

  if (typeof sortedProperties[0][sortByAttribute] === "number") {
    return sortedProperties.sort(
      (b, a) => (a[sortByAttribute] as number) - (b[sortByAttribute] as number)
    );
  } else {
    return sortedProperties.sort((b, a) => {
      if (a[sortByAttribute] < b[sortByAttribute]) return -1;
      if (a[sortByAttribute] > b[sortByAttribute]) return 1;
      return 0;
    });
  }
}

type PropertyAttributes = {
  price: string;
  surfaceArea: string;
  bedrooms: string;
  bathrooms: string;
};
export function getAttributesForProperty(property: Property): PropertyAttributes {
  const isRent = property.action === "Rent";

  // Prepare price data
  const formattedPrice = property.price ? formatWithCommas(property.price) : "0";
  const paymentLabel = isRent
    ? parsePaymentFrequency(property.paymentFrequency).shortLabel
    : "";
  const priceSuffix = isRent && paymentLabel ? `/ ${paymentLabel}.` : "";
  const price = `€ ${formattedPrice} ${priceSuffix}`.trim();

  // Prepare surface area data
  const formattedSurfaceArea = property.surfaceArea
    ? formatWithCommas(property.surfaceArea)
    : "0";
  const surfaceArea = `${formattedSurfaceArea} m²`;

  // Prepare room information
  const bedrooms = `${property.bedrooms} spavaće`;
  const bathrooms = `${property.bathrooms} kupaonice`;

  return { price, surfaceArea, bedrooms, bathrooms };
}
