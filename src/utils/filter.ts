import { LatLng } from "leaflet";
import type { Filters, Property, UserData } from "../types";
import { latLngIsInPolygon } from "./geo";

export function emptyFiltersObject(): Filters {
  return {
    action: [],
    type: [],
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    visibility: [],
    polygons: [],
  };
}

function parseNumber(value: any, defaultValue: number): number {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue || defaultValue;
}

export function parseFilterValues({
  action,
  type,
  minArea,
  maxArea,
  minPrice,
  maxPrice,
  visibility,
  polygons,
}: Filters): Filters {
  return {
    action: action || [],
    type: type || [],
    minPrice: parseNumber(minPrice, 0),
    maxPrice: parseNumber(maxPrice, Infinity),
    minArea: parseNumber(minArea, 0),
    maxArea: parseNumber(maxArea, Infinity),
    visibility: visibility || [],
    polygons: polygons || [],
  };
}

export function filtersIsEmpty(filters: Filters): boolean {
  const { action, type, minArea, maxArea, minPrice, maxPrice, visibility, polygons } =
    parseFilterValues(filters);

  return (
    action.length === 0 &&
    type.length === 0 &&
    minArea === 0 &&
    maxArea === Infinity &&
    minPrice === 0 &&
    maxPrice === Infinity &&
    visibility.length === 0 &&
    polygons.length === 0
  );
}

export function propertyMatchesFilter(property: Property, filters: Filters): boolean {
  const { action, type, minArea, maxArea, minPrice, maxPrice, visibility, polygons } =
    parseFilterValues(filters);

  if (property.price < minPrice || property.price > maxPrice) return false;

  if (property.surfaceArea < minArea || property.surfaceArea > maxArea) return false;

  if (type.length > 0 && !type.includes(property.type)) return false;

  if (action.length > 0 && !action.includes(property.action)) return false;

  if (
    visibility.length > 0 &&
    !visibility.includes(property.hiddenOnWebsite ? "Hidden" : "Visible")
  )
    return false;

  if (polygons.length > 0) {
    const propertyLatLng = new LatLng(property.lat, property.lng);

    if (polygons.every((polygon) => !latLngIsInPolygon(propertyLatLng, polygon)))
      return false;
  }

  return true;
}

// Imam: usere i filtrirane propertye
// Trebam: za svaki property vidjeti koji useri (filter dakle) ga matchaju
// Trebam: i onda napraviti uniju tih usera

// TODO: buduća optimizacija: jednom kada se user matcha s propertyem (dakle kada upadne u popis),
//  ne treba ga ponovno matchati
export function usersMatchingProperties(
  users: UserData[],
  properties: Property[]
): UserData[] {
  const usersMatchingProperties = users.filter((user) => {
    if (!user.filters) return false;

    return properties.some((property) => propertyMatchesFilter(property, user.filters!));
  });

  return usersMatchingProperties;
}
