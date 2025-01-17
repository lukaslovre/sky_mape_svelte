import type { Filter } from "../stores/filtersStore.svelte";

type LatLng = Filter["polygons"][0][0];

export function latLngIsInPolygon(latLng: LatLng, polygon: LatLng[]): boolean {
  if (polygon.length < 3) return false;

  return simpleCheck(latLng, polygon) && rayCastingCheck(latLng, polygon);
}

function simpleCheck(latLng: LatLng, polygon: LatLng[]): boolean {
  const lat = latLng.lat;
  const lng = latLng.lng;

  // Correcting the bounds to match latitude and longitude
  const maxLat = Math.max(...polygon.map((point) => point.lat));
  const minLat = Math.min(...polygon.map((point) => point.lat));
  const maxLng = Math.max(...polygon.map((point) => point.lng));
  const minLng = Math.min(...polygon.map((point) => point.lng));

  // Checking if the point is within the latitude and longitude bounds
  if (lat < minLat || lat > maxLat || lng < minLng || lng > maxLng) return false;

  return true;
}

function rayCastingCheck(point: LatLng, polygon: LatLng[]): boolean {
  const lat = point.lat;
  const lng = point.lng;

  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat;
    const yi = polygon[i].lng;
    const xj = polygon[j].lat;
    const yj = polygon[j].lng;

    const intersect =
      yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}
