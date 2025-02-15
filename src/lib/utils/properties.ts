import type { Property } from "../../types";
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

///////
// Parse property field values (from value to label)
///////

// Property type
export function parsePropertyType(type: Property["type"]): string {
  switch (type) {
    case "Apartment":
      return "Stan";
    case "House":
      return "Kuća";
    case "Land":
      return "Zemljište";
    case "Commercial":
      return "Poslovni prostor";
  }
}

export const propertyTypeDropdownOptions: { value: Property["type"]; label: string }[] = [
  { value: "House", label: parsePropertyType("House") },
  { value: "Apartment", label: parsePropertyType("Apartment") },
  { value: "Commercial", label: parsePropertyType("Commercial") },
  { value: "Land", label: parsePropertyType("Land") },
];

// Property action
export function parsePropertyAction(action: Property["action"]): string {
  switch (action) {
    case "Rent":
      return "Najam";
    case "Sale":
      return "Prodaja";
  }
}

export const propertyActionDropdownOptions: {
  value: Property["action"];
  label: string;
}[] = [
  { value: "Sale", label: parsePropertyAction("Sale") },
  { value: "Rent", label: parsePropertyAction("Rent") },
];

// Property status
export function parsePropertyStatus(status: Property["status"]): string {
  switch (status) {
    case "available":
      return "Dostupno";
    case "processing":
      return "U obradi";
    case "sold":
      return "Prodano";
  }
}

export const propertyStatusDropdownOptions: {
  value: Property["status"];
  label: string;
}[] = [
  { value: "available", label: parsePropertyStatus("available") },
  { value: "processing", label: parsePropertyStatus("processing") },
  { value: "sold", label: parsePropertyStatus("sold") },
];
