import type { Property } from "../types";

export function getIconForProperty(
  property: Property,
  favoriteProperties: Property["id"][]
): string {
  const propertyType = property.type.toLowerCase();

  if (property.id.startsWith("temporary")) {
    return `${propertyType}-temporary.png`;
  }

  const propertyHidden = property.hiddenOnWebsite ? "-hidden" : "";
  const propertyFavorited = favoriteProperties.includes(property.id) ? "-favorited" : "";

  return `/${propertyType}${propertyHidden}${propertyFavorited}.png`;
}
