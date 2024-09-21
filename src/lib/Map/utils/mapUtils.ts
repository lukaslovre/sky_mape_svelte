import { LatLng, latLng, type LeafletMouseEvent } from "leaflet";
import { properties, selectedPropertyIds } from "../../../store";
import { get } from "svelte/store";

/**
 * Handles adding clicks to polygons based on the drawing state.
 * @param e Leaflet mouse event.
 * @param isDrawing Indicates if drawing mode is active.
 * @param drawingPolygonCoords Current coordinates of the drawing polygon.
 * @returns Updated array of LatLng coordinates.
 */
export function addClickToPolygons(
  e: LeafletMouseEvent,
  isDrawing: boolean,
  drawingPolygonCoords: LatLng[]
): LatLng[] {
  if (!isDrawing) return drawingPolygonCoords;

  const newCoords = [...drawingPolygonCoords];
  if (newCoords.length === 0) {
    newCoords.push(e.latlng, e.latlng); // Initialize with two identical points for drawing
  } else {
    newCoords.push(e.latlng);
  }

  return newCoords;
}

/**
 * Saves the latitude and longitude to the clipboard if Shift key is pressed.
 * @param e Leaflet mouse event.
 */
export function saveLatLngToClipboard(e: LeafletMouseEvent): void {
  if (e.originalEvent.shiftKey) {
    const text = `${e.latlng.lat}, ${e.latlng.lng}`;
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Latitude and Longitude copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy: ", err);
        alert(text); // Fallback alert if clipboard access fails
      }
    );
  }
}

/**
 * Adds a temporary property to the properties store if Ctrl key is pressed.
 * @param e Leaflet mouse event.
 */
export function addTemporaryProperty(e: LeafletMouseEvent): void {
  if (e.originalEvent.ctrlKey) {
    console.log("Adding temporary property at", e.latlng);
    properties.update((currentProperties) => [
      ...currentProperties,
      {
        id: `temporary-${Math.random().toString(36).slice(2)}`,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        type: "House",
        price: 0,
        description: "",
        action: "Sale",
        imgUrl: [""],
        title: "Temporary Property",
        surfaceArea: 0,
        websiteUrl: "",
        hiddenOnWebsite: false,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        collectionId: "",
        collectionName: "",
        bedrooms: 0,
        bathrooms: 0,
        ownerId: "",
        propertyNotes: "",
        sellerNotes: "",
      },
    ]);
  }
}

/**
 * Resets the selected property IDs.
 */
export function resetSelectedProperty(): void {
  selectedPropertyIds.set([]);
}

/**
 * Pans the map to the property with the given ID.
 * @param mapInstance Leaflet map instance.
 * @param id Property ID to pan to.
 */
export function panToPropertyById(
  mapInstance: L.Map | undefined,
  id: string | null
): void {
  if (!id || !mapInstance) return;

  const allProperties = get(properties);
  const property = allProperties.find((p) => p.id === id);
  if (property) {
    mapInstance.panTo(new LatLng(property.lat, property.lng));
  }
}
