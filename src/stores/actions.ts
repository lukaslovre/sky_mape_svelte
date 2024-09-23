// actions.js
import type { LatLng } from "leaflet";
import type { Property, UserData } from "../types";
import { filters, favoriteProperties, selectedPropertyIds } from "./store";
import { emptyFiltersObject } from "../utils/filter";

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
  userFilters: UserData["filters"],
  userFavoriteProperties: Property["id"][]
) {
  filters.set(userFilters || emptyFiltersObject());
  favoriteProperties.set(userFavoriteProperties);
}

// Clear all favorite properties
export function emptyFavorites() {
  favoriteProperties.set([]);
}
