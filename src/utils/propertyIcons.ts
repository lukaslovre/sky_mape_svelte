import type { Property } from "../types";

export function getIconForProperty(property: Property, isFavorite: boolean): string {
  const propertyType = property.type.toLowerCase();

  if (property.id.startsWith("temporary")) {
    return `${propertyType}-temporary.png`;
  }

  const propertyHidden = property.hiddenOnWebsite ? "-hidden" : "";
  const propertyFavorited = isFavorite ? "-favorited" : "";

  return `/${propertyType}${propertyHidden}${propertyFavorited}.png`;
}
