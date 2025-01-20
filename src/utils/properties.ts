import type { Property } from "../types";
import { dataStore } from "../stores/store.svelte";

export function getPropertyFromId(ids: Property["id"][]) {
  return ids
    .map((id) => dataStore.properties.find((property) => property.id === id))
    .filter((property) => property != undefined);
}

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
