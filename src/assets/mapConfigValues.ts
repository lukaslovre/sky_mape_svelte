import type { IconOptions, LatLngExpression, MapOptions } from "leaflet";

export const mapOptions: MapOptions = {
  center: [45.81, 15.98] as LatLngExpression,
  zoom: 10,
  zoomSnap: 0.1,
};

export const markerOptions: IconOptions = {
  iconUrl: `/house.png`,
  iconSize: [48, 72],
  iconAnchor: [24, 72],
  popupAnchor: [0, -72],
};
