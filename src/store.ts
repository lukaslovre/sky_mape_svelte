import { derived, writable, type Readable, type Writable } from "svelte/store";
import type { Filters, Property, Tabs, UserData } from "./types";
import {
  emptyFiltersObject,
  filtersIsEmpty,
  propertyMatchesFilter,
  usersMatchingProperties,
} from "./utils/filter";
import { getProperties } from "./db/Properties";
import { getUsers } from "./db/Clients";
import { bounds, LatLng, LatLngBounds } from "leaflet";
import { getPropertyFromId } from "./utils/propertes";

// Define your initial store state
const initialFilters: Filters = emptyFiltersObject();
const initialTab: Tabs = "Map";

// Create a writable store
export const filters: Writable<Filters> = writable(initialFilters);
export const activeTab: Writable<Tabs> = writable(initialTab);
export const selectedPropertyId: Writable<Property["id"] | null> = writable(null);
export const properties: Writable<Property[]> = writable([]);
export const filteredProperties: Readable<Property[]> = derived(
  [properties, filters],
  ([$properties, $filters]) => {
    if (filtersIsEmpty($filters)) return $properties;

    console.log("filteredProperties derived function called!");

    return $properties.filter((property) => propertyMatchesFilter(property, $filters));
  }
);
export const favoriteProperties: Writable<Property["id"][]> = writable([]);
export const users: Writable<UserData[]> = writable([]);
export const filteredUsers: Readable<UserData[]> = derived(
  [users, filteredProperties, properties, selectedPropertyId],
  ([$users, $filteredProperties, $properties, $selectedPropertyId]) => {
    console.log("filteredUsers derived function called!");

    // If property is selected, match only for that one property,
    // otherwise match for all filtered properties
    if ($selectedPropertyId !== null) {
      const selectedProperty = getPropertyFromId($selectedPropertyId);

      if (!selectedProperty) return [];

      return usersMatchingProperties($users, [selectedProperty]);
    } else {
      if ($filteredProperties.length === $properties.length) return $users;

      return usersMatchingProperties($users, $filteredProperties);
    }
  }
);

export const propertiesBoundingBox: Readable<LatLngBounds | null> = derived(
  filteredProperties,
  ($filteredProperties) => {
    if ($filteredProperties.length === 0) return null;

    console.log("propertiesBoundingBox derived function called!");

    const { maxLat, maxLng, minLat, minLng } = $filteredProperties.reduce(
      getBoundsReducer,
      emptyBoundsObject()
    );

    const bounds: LatLngBounds = new LatLngBounds([
      [minLat, minLng],
      [maxLat, maxLng],
    ]);

    return bounds.pad(0.2);
  }
);

//   Fetch data from database and set it to the store

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

function getBoundsReducer(acc: any, property: Property) {
  const { lat, lng } = property;

  if (lat > acc.maxLat) acc.maxLat = lat;
  if (lng > acc.maxLng) acc.maxLng = lng;
  if (lat < acc.minLat) acc.minLat = lat;
  if (lng < acc.minLng) acc.minLng = lng;

  return acc;
}
function emptyBoundsObject() {
  return {
    maxLat: -Infinity,
    maxLng: -Infinity,
    minLat: Infinity,
    minLng: Infinity,
  };
}
