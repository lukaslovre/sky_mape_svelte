import { LatLng, type LeafletMouseEvent } from "leaflet";
import { dataStore } from "../../../lib/stores/store.svelte";

/**
 * Handles adding clicks to polygons based on the drawing state.
 * @param e Leaflet mouse event.
 * @param drawingPolygonCoords Current coordinates of the drawing polygon.
 * @returns Updated array of LatLng coordinates.
 */
export function addClickToPolygons(
  e: LeafletMouseEvent,
  drawingPolygonCoords: LatLng[]
): LatLng[] {
  if (!dataStore.isDrawing) return drawingPolygonCoords;

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
    dataStore.properties.push({
      id: `temporary-${Math.random().toString(36).slice(2)}`,
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      type: "House",
      price: 0,
      paymentFrequency: null,
      // description: "",
      action: "Sale",
      imgUrl: [""],
      // title: "Temporary Property",
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
      agent_id: "",
      status: "available",
    });
  }
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

  const property = dataStore.properties.find((p) => p.id === id);
  if (property) {
    mapInstance.panTo(new LatLng(property.lat, property.lng));
  }
}

export function isClickNearStart(
  mapInstance: L.Map,
  clickLatLng: LatLng,
  polygonCoords: LatLng[],
  pixelPadding: number = 30
): boolean {
  if (polygonCoords.length === 0) return false;

  const startPoint = polygonCoords[0];

  // Convert geographic coordinates to pixel coordinates
  const startPointInPixels = mapInstance.latLngToLayerPoint(startPoint);
  const clickedPointInPixels = mapInstance.latLngToLayerPoint(clickLatLng);

  // Calculate pixel distance
  const pixelDistance = startPointInPixels.distanceTo(clickedPointInPixels);

  return pixelDistance <= pixelPadding;
}
