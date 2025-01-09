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

// Save a polygon to filters without mutating the original state
export function savePolygon(polygon: LatLng[]) {
  filters.update((currentFilters) => ({
    ...currentFilters,
    polygons: [...currentFilters.polygons, polygon],
  }));
}

// Remove a polygon from filters without mutating the original state
export function removePolygon(polygon: LatLng[]) {
  filters.update((currentFilters) => ({
    ...currentFilters,
    polygons: currentFilters.polygons.filter(
      (currentPolygon) => currentPolygon !== polygon
    ),
  }));
}

// Reset filters to their initial empty state
export function resetFilters() {
  filters.set(emptyFiltersObject());
}

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
