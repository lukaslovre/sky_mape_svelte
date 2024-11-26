import type { Property } from "../types";

type OnlyNeededPropertyAttributes = {
  type: Property["type"];
  hiddenOnWebsite: Property["hiddenOnWebsite"];
  id?: Property["id"];
};

export function getIconForProperty(
  property: OnlyNeededPropertyAttributes,
  isFavorite: boolean
): string {
  console.log(property);
  const propertyType = property.type.toLowerCase();

  if (property.id?.startsWith("temporary")) {
    return `${propertyType}-temporary.png`;
  }

  const propertyHidden = property.hiddenOnWebsite ? "-hidden" : "";
  const propertyFavorited = isFavorite ? "-favorited" : "";

  return `/${propertyType}${propertyHidden}${propertyFavorited}.png`;
}
