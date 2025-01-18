import { LatLng } from "leaflet";
import type { Filters, Property, Client } from "../types";
import { latLngIsInPolygon } from "./geo";
import { FiltersSchema, type Filter } from "../stores/filtersStore.svelte";

// TODO: napravit lijepo typescript da kad se promjeni u filters nešto da mi svugdje kaže gdje treba promjeniti

export function emptyFiltersObject(): Filters {
  return {
    action: [],
    type: [],
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    visibility: [],
    status: [],
    agentIds: [],
    polygons: [],
  };
}

function parseNumber(value: unknown, defaultValue: number): number {
  if (typeof value === "number") return value || defaultValue;
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  }
  return defaultValue;
}

export function parseFilterValues(filters: Partial<Filters>): Filters {
  return {
    action: filters.action || [],
    type: filters.type || [],
    minPrice: parseNumber(filters.minPrice, 0),
    maxPrice: parseNumber(filters.maxPrice, Infinity),
    minArea: parseNumber(filters.minArea, 0),
    maxArea: parseNumber(filters.maxArea, Infinity),
    visibility: filters.visibility || [],
    status: filters.status || [],
    agentIds: filters.agentIds || [],
    polygons: filters.polygons || [],
  };
}

export function filtersIsEmpty(filters: Filters): boolean {
  const parsedFilters = parseFilterValues(filters);

  return (
    parsedFilters.action.length === 0 &&
    parsedFilters.type.length === 0 &&
    parsedFilters.minArea === 0 &&
    parsedFilters.maxArea === Infinity &&
    parsedFilters.minPrice === 0 &&
    parsedFilters.maxPrice === Infinity &&
    parsedFilters.visibility.length === 0 &&
    parsedFilters.status.length === 0 &&
    parsedFilters.agentIds.length === 0 &&
    parsedFilters.polygons.length === 0
  );
}

// TODO: Check more detailed this function after refactor
export function propertyMatchesFilter(property: Property, filters: Filter): boolean {
  // const parsedFilters = parseFilterValues(filters);
  // console.log("Parsed filters:", parsedFilters);
  // console.log("Property:", property);

  const {
    action,
    type,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    visibility,
    status,
    agentIds,
    polygons,
  } = filters;

  if (property.price) {
    if (property.price < minPrice || property.price > (maxPrice || Infinity)) {
      // console.log("Failed price filter");
      return false;
    }
  }

  if (property.surfaceArea) {
    if (property.surfaceArea < minArea || property.surfaceArea > (maxArea || Infinity)) {
      // console.log("Failed area filter");
      return false;
    }
  }

  if (type.length > 0 && !type.includes(property.type)) {
    // console.log("Failed type filter");
    return false;
  }

  if (action.length > 0 && !action.includes(property.action)) {
    // console.log("Failed action filter");
    return false;
  }

  if (
    visibility.length > 0 &&
    !visibility.includes(property.hiddenOnWebsite ? "Hidden" : "Visible")
  ) {
    // console.log("Failed visibility filter");
    return false;
  }

  if (status.length > 0 && !status.includes(property.status)) {
    // console.log("Failed status filter");
    return false;
  }

  if (agentIds.length > 0 && !agentIds.includes(property.agent_id)) {
    // console.log("Failed agent filter");
    return false;
  }

  if (polygons.length > 0) {
    const propertyLatLng = new LatLng(property.lat, property.lng);

    if (polygons.every((polygon) => !latLngIsInPolygon(propertyLatLng, polygon))) {
      // console.log("Failed polygon filter");
      return false;
    }
  }

  // console.log("Property passed all filters");
  return true;
}

export function removeEmptyValuesFromFilters(filters: Filter) {
  console.log("Filters before removing empty values:", filters);

  const filteredFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else if (value === Infinity) {
          return false;
        }
        return true;
      }
      return false;
    })
  );

  console.log("Filters after removing empty values:", filteredFilters);
  return filteredFilters;
}

// Imam: usere i filtrirane propertye
// Trebam: za svaki property vidjeti koji useri (filter dakle) ga matchaju
// Trebam: i onda napraviti uniju tih usera

// TODO: buduća optimizacija: jednom kada se user matcha s propertyem (dakle kada upadne u popis),
//  ne treba ga ponovno matchati
export function usersMatchingProperties(
  users: Client[],
  properties: Property[]
): Client[] {
  const usersMatchingProperties = users.filter((user) => {
    if (!user.filters) return false;

    return properties.some((property) => propertyMatchesFilter(property, user.filters));
  });

  return usersMatchingProperties;
}

export function ownersMatchingProperties(
  users: Client[],
  properties: Property[]
): Client[] {
  const ownersMatchingProperties = users.filter((user) => {
    return properties.some((property) => property.ownerId === user.id);
  });

  return ownersMatchingProperties;
}
