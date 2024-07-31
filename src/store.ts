import { derived, writable, type Readable, type Writable } from "svelte/store";
import type { Filters, Property, Tabs, UserData } from "./types";
import { emptyFiltersObject, parseFilterValues, filterProperties } from "./utils/filter";
import { getProperties } from "./db/Properties";
import { getUsers } from "./db/Clients";
import type { LatLng } from "leaflet";

// Define your initial store state
const initialFilters: Filters = emptyFiltersObject();
const initialTab: Tabs = "Map";

// Create a writable store
export const filters: Writable<Filters> = writable(initialFilters);
export const activeTab: Writable<Tabs> = writable(initialTab);
export const properties: Writable<Property[]> = writable([]);
export const users: Writable<UserData[]> = writable([]);
export const filteredProperties: Readable<Property[]> = derived(
  [properties, filters],
  ([$properties, $filters]) => {
    return filterProperties($properties, parseFilterValues($filters));
  }
);
export const favoriteProperties: Writable<Property["id"][]> = writable([]);

getProperties()
  .then((data) => {
    properties.set(data);
  })
  .catch((error) => {
    console.error(error);
  });

getUsers()
  .then((data) => {
    users.set(data);
  })
  .catch((error) => {
    console.error(error);
  });

//   Functions

export function savePolygon(polygon: LatLng[]) {
  filters.update((currentFilters) => {
    currentFilters.polygons.push(polygon);
    return currentFilters;
  });
}

export function resetFilters() {
  filters.set(emptyFiltersObject());
}
