import type { Property } from "../types";

type OnlyNeededPropertyAttributes = Pick<Property, "type" | "hiddenOnWebsite" | "id">;

export function getIconForProperty(
  property: OnlyNeededPropertyAttributes,
  isFavorite: boolean = false,
  isSelected: boolean = false
): string {
  const propertyType = property.type.toLowerCase();
  // const propertyTemporary = property.id?.startsWith("temporary") ? "-temporary" : "";
  const propertyTemporary = "";
  const propertyHidden = property.hiddenOnWebsite ? "-hidden" : "";
  const propertyFavorited = isFavorite ? "-favorited" : "";
  const propertySelected = isSelected ? "-selected" : "";

  return `/${propertyType}${propertyTemporary}${propertyHidden}${propertyFavorited}${propertySelected}.png`;
}
