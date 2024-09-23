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
