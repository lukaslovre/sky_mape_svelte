import { LatLng } from "leaflet";
import type { Filters, Property } from "../types";
import { latLngIsInPolygon } from "./geo";

export function emptyFiltersObject(): Filters {
  return {
    action: [],
    type: [],
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    polygons: [],
  };
}

export function filterProperties(properties: Property[], filters: Filters): Property[] {
  const { action, type, minArea, maxArea, minPrice, maxPrice, polygons } = filters;

  const filteredProperties = properties.filter((house) => {
    if (house.price < minPrice || house.price > maxPrice) return false;

    if (house.surfaceArea < minArea || house.surfaceArea > maxArea) return false;

    if (type.length > 0 && !type.includes(house.type)) return false;

    if (action.length > 0 && !action.includes(house.action)) return false;

    if (
      polygons.length > 0 &&
      polygons.every(
        (polygon) => !latLngIsInPolygon(new LatLng(house.lat, house.lng), polygon)
      )
    )
      return false;

    return true;
  });

  return filteredProperties;
}
export function parseFilterValues({
  action,
  type,
  minArea,
  maxArea,
  minPrice,
  maxPrice,
  polygons,
}: Filters): Filters {
  return {
    action: action || [],
    type: type || [],
    minPrice: minPrice || 0,
    maxPrice: maxPrice || Infinity,
    minArea: minArea || 0,
    maxArea: maxArea || Infinity,
    polygons: polygons || [],
  };
}
