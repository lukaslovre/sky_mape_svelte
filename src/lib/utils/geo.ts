import type { LatLng } from "leaflet";

export function latLngIsInPolygon(latLng: LatLng, polygon: LatLng[]): boolean {
  const x = latLng.lat;
  const y = latLng.lng;

  const maxY = Math.max(...polygon.map((point) => point.lat));
  const minY = Math.min(...polygon.map((point) => point.lat));
  const maxX = Math.max(...polygon.map((point) => point.lng));
  const minX = Math.min(...polygon.map((point) => point.lng));

  if (x < minY || x > maxY || y < minX || y > maxX) return false;

  return true;
}
