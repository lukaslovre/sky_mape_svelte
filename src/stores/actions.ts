// actions.js
import type { LatLngBounds } from "leaflet";
import type { Property, Client } from "../types";
import { dataStore } from "./store.svelte";
import { propertyFormStore } from "./propertiesFormStore.svelte";

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
export function removePropertyFromStore(propertyId: Property["id"]) {
  dataStore.properties = dataStore.properties.filter(
    (currentProperty) => currentProperty.id !== propertyId
  );
}

// Client actions
export function addClientToStore(client: Client) {
  dataStore.users.push(client);

  if (client.userType === "seller") {
    setOwnerDropdownOptions();
  }
}
export function updateClientInStore(client: Client) {
  dataStore.users = dataStore.users.map((currentUser) =>
    currentUser.id === client.id ? client : currentUser
  );

  if (client.userType === "seller") {
    setOwnerDropdownOptions();
  }
}
export function removeClientFromStore(clientId: Client["id"]) {
  dataStore.users = dataStore.users.filter((currentUser) => currentUser.id !== clientId);

  setOwnerDropdownOptions();
}

function setOwnerDropdownOptions() {
  propertyFormStore.setFieldOptions(
    "ownerId",
    dataStore.users
      .filter((user) => user.userType === "seller")
      .map((user) => ({
        value: user.id,
        label: user.name,
      }))
  );
}
