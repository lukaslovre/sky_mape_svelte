import {
  ownersMatchingProperties,
  propertyMatchesFilter,
  usersMatchingProperties,
} from "../utils/filter";
import type { Property, Client, Agent } from "../types";
import { LatLngBounds } from "leaflet";
import { getProperties } from "../models/Properties";
import { getUsers } from "../models/Clients";
import { emptyBoundsObject, getBoundsReducer } from "./utils/bounds";
import { getAgentsFromDb } from "../models/Agents";
import { FiltersSchemaWithDefaults, filtersStore } from "./filtersStore.svelte";
import { propertyFormStore } from "./propertiesFormStore.svelte";

class DataStore {
  ////////
  // State values
  ////////

  properties = $state<Property[]>([]);
  users = $state<Client[]>([]);
  agents = $state<Agent[]>([]);

  selectedPropertyIds = $state<Property["id"][]>([]);
  focusedPropertyId = $state<Property["id"] | null>(null);

  favoriteProperties = $state<Property["id"][]>([]);
  isDrawing = $state<boolean>(false);

  ////////
  // Derived values
  ////////

  filteredProperties = $derived.by<Property[]>(() => {
    if (filtersStore.isEmpty()) return this.properties;

    return this.properties.filter((property) =>
      propertyMatchesFilter(property, filtersStore.filters)
    );
  });

  filteredUsers = $derived.by<Client[]>(() => {
    if (this.selectedPropertyIds.length > 0) {
      const selectedProperties: Property[] = this.getPropertiesByIds(
        this.selectedPropertyIds
      );

      if (!selectedProperties) {
        return [];
      }

      return usersMatchingProperties(this.users, selectedProperties);
    } else {
      if (this.filteredProperties.length === this.properties.length) return this.users;

      return usersMatchingProperties(this.users, this.filteredProperties);
    }
  });

  filteredOwners = $derived.by<Client[]>(() => {
    if (this.selectedPropertyIds.length > 0) {
      const selectedProperties: Property[] = this.getPropertiesByIds(
        this.selectedPropertyIds
      );

      if (!selectedProperties) {
        return [];
      }

      return ownersMatchingProperties(this.users, selectedProperties);
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

  ////////
  // Methods
  ////////
  setSelectedPropertyIds(propertyIds: Property["id"][]) {
    // I need to decide on some logic/way that will dictate the relationship between selectedPropertyIds and focusedPropertyId.
    // For example, if only one property is selected, then focusedPropertyId should be the same as selectedPropertyIds[0].
    // If multiple properties are selected, then focusedPropertyId should be the last one added
    // If no properties are selected, then focusedPropertyId should be null.
    // If a property is focused, then it should be selected.
    // Am I missing any other cases?

    this.selectedPropertyIds = propertyIds;

    if (propertyIds.length === 1) {
      this.focusedPropertyId = propertyIds[0];
    } else if (propertyIds.length > 1) {
      this.focusedPropertyId = propertyIds.at(-1) ?? null;
    } else {
      this.focusedPropertyId = null;
    }
  }

  getPropertiesByIds(propertyIds: Property["id"][]): Property[] {
    return this.properties.filter((property) => propertyIds.includes(property.id));
  }
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
