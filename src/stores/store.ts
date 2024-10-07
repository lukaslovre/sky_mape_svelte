// stores.js
import { derived, writable, type Readable, type Writable } from "svelte/store";
import {
  emptyFiltersObject,
  filtersIsEmpty,
  ownersMatchingProperties,
  propertyMatchesFilter,
  usersMatchingProperties,
} from "../utils/filter";
import type { Agent, Filters, Property, Tabs, UserData } from "../types";
import { LatLngBounds } from "leaflet";
import { getProperties } from "../models/Properties";
import { getUsers } from "../models/Clients";
import { emptyBoundsObject, getBoundsReducer } from "./utils/bounds";
import { getAgentsFromDb } from "../models/Agents";

// Initial store states
const initialFilters: Filters = emptyFiltersObject();
const initialTab: Tabs = "Map";

// Writable stores
export const filters: Writable<Filters> = writable(initialFilters);
export const activeTab: Writable<Tabs> = writable(initialTab);
export const selectedPropertyIds: Writable<Property["id"][]> = writable([]);
export const properties: Writable<Property[]> = writable([]);
export const favoriteProperties: Writable<Property["id"][]> = writable([]);
export const users: Writable<UserData[]> = writable([]);
export const agents: Writable<Agent[]> = writable([]);

// Secondary writable stores
export const isDrawing: Writable<boolean> = writable(false);

// Derived store for filtered properties
export const filteredProperties: Readable<Property[]> = derived(
  [properties, filters, selectedPropertyIds],
  ([$properties, $filters, $selectedPropertyIds]) => {
    if ($selectedPropertyIds.length > 1) {
      // Return properties matching the selected IDs
      return $properties.filter((property) => $selectedPropertyIds.includes(property.id));
    }

    if (filtersIsEmpty($filters)) return $properties;

    return $properties.filter((property) => propertyMatchesFilter(property, $filters));
  }
);

// Derived store for filtered users
export const filteredUsers: Readable<UserData[]> = derived(
  [users, filteredProperties, properties, selectedPropertyIds],
  ([$users, $filteredProperties, $properties, $selectedPropertyIds]) => {
    if ($selectedPropertyIds.length === 1) {
      const selectedPropertyId = $selectedPropertyIds[0];
      const selectedProperty = $properties.find(
        (property) => property.id === selectedPropertyId
      );

      if (!selectedProperty) return [];

      return usersMatchingProperties($users, [selectedProperty]);
    } else {
      if ($filteredProperties.length === $properties.length) return $users;

      return usersMatchingProperties($users, $filteredProperties);
    }
  }
);

// TODO: u budučnosti, možda, napraviti da uvijek gleda samo filteredProperties, dakle nebi postojala potreba da properties i selectedPropertyIds budu uključeni u ovaj derived store
// Derived store for filtered owners
export const filteredOwners: Readable<UserData[]> = derived(
  [users, filteredProperties, properties, selectedPropertyIds],
  ([$users, $filteredProperties, $properties, $selectedPropertyIds]) => {
    if ($selectedPropertyIds.length === 1) {
      const selectedPropertyId = $selectedPropertyIds[0];
      const selectedProperty = $properties.find(
        (property) => property.id === selectedPropertyId
      );

      if (!selectedProperty) return [];

      return ownersMatchingProperties($users, [selectedProperty]);
    } else {
      return ownersMatchingProperties($users, $filteredProperties);
    }
  }
);

// Derived store for properties bounding box
export const propertiesBoundingBox: Readable<LatLngBounds | null> = derived(
  filteredProperties,
  ($filteredProperties) => {
    if ($filteredProperties.length === 0) return null;

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

// Fetch data and populate stores
getProperties()
  .then((data) => properties.set(data))
  .catch(console.error);

getUsers()
  .then((data) => users.set(data))
  .catch(console.error);

getAgentsFromDb()
  .then((data) => agents.set(data))
  .catch(console.error);
