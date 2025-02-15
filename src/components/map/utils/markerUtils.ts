import L from "leaflet";
import type { Property } from "../../../types";
import { markerOptions } from "../../../lib/config/map";
import { getIconForProperty } from "../../../lib/utils/propertyIcons";

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
