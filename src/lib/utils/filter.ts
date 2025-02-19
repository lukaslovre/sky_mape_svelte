import type { Property, Client } from "../../types";
import type { Filter } from "../stores/filtersStore.svelte";
import { LatLng } from "leaflet";
import { latLngIsInPolygon } from "./geo";

// TODO: napravit lijepo typescript da kad se promjeni u filters nešto da mi svugdje kaže gdje treba promjeniti

// TODO: Check more detailed this function after refactor
export function propertyMatchesFilter(property: Property, filters: Filter): boolean {
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
    if (user.userType === "seller") return false;

    return properties.some((property) =>
      propertyMatchesFilter(property, user.filters as Filter)
    );
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
