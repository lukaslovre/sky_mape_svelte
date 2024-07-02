import type { IconOptions, LatLngExpression } from "leaflet";

export const mapOptions = {
  center: [45.81, 15.98] as LatLngExpression,
  zoom: 11.25,
};

export const markerOptions: IconOptions = {
  iconUrl: `/house.png`,
  iconSize: [48, 72],
  iconAnchor: [24, 72],
  popupAnchor: [0, -72],
};
