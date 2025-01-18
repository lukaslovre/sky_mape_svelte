// actions.js
import type { LatLng, LatLngBounds } from "leaflet";
import type { Property, Client } from "../types";
// import {
//   filters,
//   favoriteProperties,
//   selectedPropertyIds,
//   properties,
//   users,
//   dataStore,
// } from "./store.svelte";
import { emptyFiltersObject, parseFilterValues } from "../utils/filter";
import { filtersStore } from "./filtersStore.svelte";
import { dataStore } from "./store.svelte";

// **Context for Copilot**:
// I am refactoring this file to use the new `dataStore` instead of the old `store.svelte` store. I am also trying to make the code more idiomatic to Svelte 5.

// Toggle the selection of a property ID
export function toggleSelectedProperty(propertyId: Property["id"]) {
  dataStore.selectedPropertyIds = dataStore.selectedPropertyIds.includes(propertyId)
    ? dataStore.selectedPropertyIds.filter((id) => id !== propertyId)
    : [...dataStore.selectedPropertyIds, propertyId];

  // selectedPropertyIds.update((currentSelectedPropertyIds) =>
  //   currentSelectedPropertyIds.includes(propertyId)
  //     ? currentSelectedPropertyIds.filter((id) => id !== propertyId)
  //     : [...currentSelectedPropertyIds, propertyId]
  // );
}

// Apply user-specific filters and favorite properties
export function applyUserFilters(
  userFilters: Client["filters"] | undefined,
  userFavoriteProperties: Property["id"][] | undefined
) {
  if (userFilters && typeof userFilters === "object") {
    const parsedFilters = parseFilterValues(userFilters);

    filters.set(parsedFilters);
  }

  if (userFavoriteProperties && Array.isArray(userFavoriteProperties)) {
    favoriteProperties.set(userFavoriteProperties);
  }
}

// Clear all favorite properties
export function emptyFavorites() {
  dataStore.favoriteProperties = [];
}

// Toggle favorite
export function toggleFavorite(propertyId: Property["id"]) {
  dataStore.favoriteProperties = dataStore.favoriteProperties.includes(propertyId)
    ? dataStore.favoriteProperties.filter((id) => id !== propertyId)
    : [...dataStore.favoriteProperties, propertyId];
}

// Fit the view to the bounds of the properties
export function fitViewToFilteredProperties(
  mapInstance: L.Map | undefined,
  propertiesBoundingBox: LatLngBounds | null
) {
  if (!mapInstance || !propertiesBoundingBox) return;

  mapInstance.fitBounds(propertiesBoundingBox, { maxZoom: 15 });
}

// Property actions
export function addPropertyToStore(property: Property) {
  dataStore.properties.push(property);
}
export function updatePropertyInStore(property: Property) {
  dataStore.properties = dataStore.properties.map((currentProperty) =>
    currentProperty.id === property.id ? property : currentProperty
  );
}

// Client actions
export function addClientToStore(client: Client) {
  users.update((user) => {
    return [...user, client];
  });
}
export function updateClientInStore(client: Client) {
  users.update((user) => {
    return user.map((currentUser) =>
      currentUser.id === client.id ? client : currentUser
    );
  });
}
