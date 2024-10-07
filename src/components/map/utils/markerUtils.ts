import L from "leaflet";
import type { Property } from "../../../types";
import { markerOptions } from "../../../assets/mapConfigValues";
import { getIconForProperty } from "../../../utils/propertyIcons";

export function setAppropriateMarkerIcon(
  marker: L.Marker,
  property: Property,
  favorites: Property["id"][]
) {
  marker.setIcon(
    new L.Icon({
      ...markerOptions,
      iconUrl: getIconForProperty(property, favorites.includes(property.id)),
    })
  );
}
