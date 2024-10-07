import { get } from "svelte/store";
import { properties } from "../stores/store";
import type { Property } from "../types";

export function getPropertyFromId(ids: Property["id"][]) {
  return ids
    .map((id) => get(properties).find((property) => property.id === id))
    .filter((property) => property !== undefined);
}

export function sortProperties(
  properties: Property[],
  sortByAttribute: keyof Property | null
): Property[] {
  if (sortByAttribute === null) return properties;

  if (properties.length === 0) return properties;

  if (typeof properties[0][sortByAttribute] === "number") {
    return properties.sort(
      (a, b) => (a[sortByAttribute] as number) - (b[sortByAttribute] as number)
    );
  } else {
    return properties.sort((a, b) => {
      if (a[sortByAttribute] < b[sortByAttribute]) return -1;
      if (a[sortByAttribute] > b[sortByAttribute]) return 1;
      return 0;
    });
  }
}
