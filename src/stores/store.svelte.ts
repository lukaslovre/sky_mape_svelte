import {
  emptyFiltersObject,
  filtersIsEmpty,
  ownersMatchingProperties,
  propertyMatchesFilter,
  usersMatchingProperties,
} from "../utils/filter";
import type { Filters, Property, Tabs, Client, Agent } from "../types";
import { LatLngBounds } from "leaflet";
import { getProperties } from "../models/Properties";
import { getUsers } from "../models/Clients";
import { emptyBoundsObject, getBoundsReducer } from "./utils/bounds";
import { getAgentsFromDb } from "../models/Agents";
import {
  FiltersSchema,
  FiltersSchemaWithDefaults,
  filtersStore,
} from "./filtersStore.svelte";
import { propertyFormStore } from "./propertiesFormStore.svelte";

class DataStore {
  ////////
  // State values
  ////////

  properties = $state<Property[]>([]);
  users = $state<Client[]>([]);
  agents = $state<Agent[]>([]);

  selectedPropertyIds = $state<Property["id"][]>([]);
  favoriteProperties = $state<Property["id"][]>([]);
  isDrawing = $state<boolean>(false);

  ////////
  // Derived values
  ////////

  filteredProperties = $derived.by<Property[]>(() => {
    // if (this.selectedPropertyIds.length > 1) {
    //   // Return properties matching the selected IDs
    //   return this.properties.filter((property) =>
    //     this.selectedPropertyIds.includes(property.id)
    //   );
    // }

    if (filtersStore.isEmpty()) return this.properties;

    return this.properties.filter((property) =>
      propertyMatchesFilter(property, filtersStore.filters)
    );
  });

  filteredUsers = $derived.by<Client[]>(() => {
    if (this.selectedPropertyIds.length === 1) {
      const selectedPropertyId = this.selectedPropertyIds[0];
      const selectedProperty = this.properties.find(
        (property) => property.id === selectedPropertyId
      );

      if (!selectedProperty) {
        console.log(`Property with ID ${selectedPropertyId} not found.`);
        return [];
      }

      return usersMatchingProperties(this.users, [selectedProperty]);
    } else {
      if (this.filteredProperties.length === this.properties.length) return this.users;

      return usersMatchingProperties(this.users, this.filteredProperties);
    }
  });

  filteredOwners = $derived.by<Client[]>(() => {
    if (this.selectedPropertyIds.length === 1) {
      const selectedPropertyId = this.selectedPropertyIds[0];
      const selectedProperty = this.properties.find(
        (property) => property.id === selectedPropertyId
      );

      if (!selectedProperty) {
        console.log(`Property with ID ${selectedPropertyId} not found.`);
        return [];
      }

      return ownersMatchingProperties(this.users, [selectedProperty]);
    } else {
      return ownersMatchingProperties(this.users, this.filteredProperties);
    }
  });

  propertiesBoundingBox = $derived.by<LatLngBounds | null>(() => {
    if (this.filteredProperties.length === 0) return null;

    const { maxLat, maxLng, minLat, minLng } = this.filteredProperties.reduce(
      getBoundsReducer,
      emptyBoundsObject()
    );

    const bounds: LatLngBounds = new LatLngBounds([
      [minLat, minLng],
      [maxLat, maxLng],
    ]);

    return bounds.pad(0.2);
  });
}

export const dataStore = new DataStore();

// Fetch data and populate stores
getProperties()
  .then((data) => {
    dataStore.properties = data;
  })
  .catch(console.error);

getUsers()
  .then((data) => {
    const parsedData = data
      .map((user) => {
        // If an incomplete filter is sent, it will be filled with default values
        const zodResult = FiltersSchemaWithDefaults.safeParse(user.filters);

        if (zodResult.error) {
          console.log(zodResult.error);
          return null;
        }

        return {
          ...user,
          filters: zodResult.data,
        };
      })
      .filter((user) => user !== null);

    console.log(parsedData);

    dataStore.users = parsedData;
    propertyFormStore.setFieldOptions(
      "ownerId",
      parsedData
        .filter((user) => user.userType === "seller")
        .map((user) => ({
          value: user.id,
          label: user.name,
        }))
    );
  })
  .catch(console.error);

getAgentsFromDb()
  .then((data) => {
    dataStore.agents = data;
    propertyFormStore.setFieldOptions(
      "agent_id",
      data.map((agent) => ({
        value: agent.id,
        label: agent.name,
      }))
    );
  })
  .catch(console.error);
