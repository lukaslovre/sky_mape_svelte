// actions.js
import type { LatLng, LatLngBounds } from "leaflet";
import type { Property, Client } from "../types";
import {
  filters,
  favoriteProperties,
  selectedPropertyIds,
  properties,
  users,
} from "./store";
import { emptyFiltersObject, parseFilterValues } from "../utils/filter";
import { filtersStore } from "./filtersStore.svelte";

// Toggle the selection of a property ID
export function toggleSelectedProperty(propertyId: Property["id"]) {
  selectedPropertyIds.update((currentSelectedPropertyIds) =>
    currentSelectedPropertyIds.includes(propertyId)
      ? currentSelectedPropertyIds.filter((id) => id !== propertyId)
      : [...currentSelectedPropertyIds, propertyId]
  );
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
  favoriteProperties.set([]);
}

// Toggle favorite
export function toggleFavorite(propertyId: Property["id"]) {
  favoriteProperties.update((currentFavorites) =>
    currentFavorites.includes(propertyId)
      ? currentFavorites.filter((id) => id !== propertyId)
      : [...currentFavorites, propertyId]
  );
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
  properties.update((currentProperties) => {
    return [...currentProperties, property];
  });
}
export function updatePropertyInStore(property: Property) {
  properties.update((currentProperties) => {
    return currentProperties.map((currentProperty) =>
      currentProperty.id === property.id ? property : currentProperty
    );
  });
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
