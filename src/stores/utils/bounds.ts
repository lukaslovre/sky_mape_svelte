import { LatLngBounds } from "leaflet";
import type { Property } from "../../types";

export type Bounds = {
  maxLat: number;
  maxLng: number;
  minLat: number;
  minLng: number;
};

export function getBoundsReducer(acc: Bounds, property: Property): Bounds {
  const { lat, lng } = property;

  return {
    maxLat: Math.max(acc.maxLat, lat),
    maxLng: Math.max(acc.maxLng, lng),
    minLat: Math.min(acc.minLat, lat),
    minLng: Math.min(acc.minLng, lng),
  };
}

export function emptyBoundsObject(): Bounds {
  return {
    maxLat: -Infinity,
    maxLng: -Infinity,
    minLat: Infinity,
    minLng: Infinity,
  };
}

// export class LatLngBounds {
//     constructor(southWest: LatLngExpression, northEast: LatLngExpression);
//     constructor(latlngs: LatLngExpression[]);
//     extend(latlngOrBounds: LatLngExpression | LatLngBoundsExpression): this;
//     pad(bufferRatio: number): LatLngBounds; // Returns a new LatLngBounds
//     getCenter(): LatLng;
//     getSouthWest(): LatLng;
//     getNorthEast(): LatLng;
//     getNorthWest(): LatLng;
//     getSouthEast(): LatLng;
//     getWest(): number;
//     getSouth(): number;
//     getEast(): number;
//     getNorth(): number;
//     contains(otherBoundsOrLatLng: LatLngBoundsExpression | LatLngExpression): boolean;
//     intersects(otherBounds: LatLngBoundsExpression): boolean;
//     overlaps(otherBounds: LatLngBoundsExpression): boolean;
//     toBBoxString(): string;
//     equals(otherBounds: LatLngBoundsExpression, maxMargin?: number): boolean;
//     isValid(): boolean;
// }

export function getBoundsForBounds(bounds: LatLngBounds[]): LatLngBounds | null {
  if (bounds.length === 0) {
    return null;
  }

  let south = Infinity;
  let west = Infinity;
  let north = -Infinity;
  let east = -Infinity;

  bounds.forEach((b) => {
    const sw = b.getSouthWest();
    const ne = b.getNorthEast();

    if (sw.lat < south) {
      south = sw.lat;
    }
    if (sw.lng < west) {
      west = sw.lng;
    }
    if (ne.lat > north) {
      north = ne.lat;
    }
    if (ne.lng > east) {
      east = ne.lng;
    }
  });

  const combinedSouthWest = { lat: south, lng: west };
  const combinedNorthEast = { lat: north, lng: east };

  return new LatLngBounds(combinedSouthWest, combinedNorthEast);
}
