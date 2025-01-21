// actions.js
import type { LatLngBounds } from "leaflet";
import type { Property, Client } from "../types";
import { dataStore } from "./store.svelte";

// Toggle the selection of a property ID
export function toggleSelectedProperty(propertyId: Property["id"]) {
  dataStore.setSelectedPropertyIds(
    dataStore.selectedPropertyIds.includes(propertyId)
      ? dataStore.selectedPropertyIds.filter((id) => id !== propertyId)
      : [...dataStore.selectedPropertyIds, propertyId]
  );
}

// Reset the selected properties
export function resetSelectedProperties(): void {
  dataStore.setSelectedPropertyIds([]);
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
  dataStore.users.push(client);
}
export function updateClientInStore(client: Client) {
  dataStore.users = dataStore.users.map((currentUser) =>
    currentUser.id === client.id ? client : currentUser
  );
}
