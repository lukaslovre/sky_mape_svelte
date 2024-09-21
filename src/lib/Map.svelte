<script lang="ts">
  import type { LatLng } from "leaflet";
  import {
    addClickToPolygons,
    addTemporaryProperty,
    panToPropertyById,
    resetSelectedProperty,
    saveLatLngToClipboard,
  } from "./Map/utils/mapUtils";
  import {
    filters,
    propertiesBoundingBox,
    savePolygon,
    selectedPropertyIds,
    toggleSelectedProperty,
  } from "../store";
  import DrawnPolygonsList from "./DrawnPolygonsList.svelte";
  import { Map, TileLayer } from "sveaflet";
  import { mapOptions } from "../assets/mapConfigValues";
  import PropertyMarkers from "./Map/PropertyMarkers.svelte";
  import DrawnPolygons from "./Map/DrawnPolygons.svelte";
  import UserPolygons from "./Map/UserPolygons.svelte";

  export let isDrawing: boolean;

  let mapInstance: L.Map | undefined;
  let eventListenersSet = false;

  // Reactive variable to store drawing polygon coordinates
  let drawingPolygonCoords: LatLng[] = [];

  // Event Handlers
  function handleMapClick(e: L.LeafletMouseEvent) {
    // Update drawing polygon coordinates
    drawingPolygonCoords = addClickToPolygons(e, isDrawing, drawingPolygonCoords);

    // Save coordinates to clipboard if Shift is pressed
    saveLatLngToClipboard(e);

    // Add a temporary property if Ctrl is pressed
    addTemporaryProperty(e);
  }

  function handlePopupClose() {
    resetSelectedProperty();
  }

  function setEventListeners(mapInstance: L.Map) {
    mapInstance.on("click", handleMapClick);
    mapInstance.on("popupclose", handlePopupClose);

    mapInstance.on("mousemove", (e: L.LeafletMouseEvent) => {
      if (!isDrawing || drawingPolygonCoords.length === 0) return;
      // Update the last coordinate with the current mouse position for dynamic drawing
      drawingPolygonCoords = [...drawingPolygonCoords.slice(0, -1), e.latlng];
    });
  }

  function handleFinishDrawing() {
    if (!mapInstance) return;

    if (drawingPolygonCoords.length >= 3) {
      // Remove the last temporary coordinate before saving
      drawingPolygonCoords.pop();
      savePolygon(drawingPolygonCoords);
    }

    // Reset drawing coordinates
    drawingPolygonCoords = [];

    if ($propertiesBoundingBox) {
      mapInstance?.fitBounds($propertiesBoundingBox);
    }
  }

  $: if (mapInstance && !eventListenersSet) {
    setEventListeners(mapInstance);
    eventListenersSet = true;
  }

  // Reactive statement to fit map bounds when propertiesBoundingBox changes
  // $: if ($propertiesBoundingBox && mapInstance) {
  //   console.log("Fitting bounds to propertiesBoundingBox");
  //   mapInstance.fitBounds($propertiesBoundingBox);
  // }

  // Reactive statement to handle drawing state changes
  $: if (!isDrawing) {
    handleFinishDrawing();
  }

  // Reactive statement to pan to the last selected property
  // $: if ($selectedPropertyIds.length) {
  //   const lastSelectedId = $selectedPropertyIds[$selectedPropertyIds.length - 1];
  //   panToPropertyById(mapInstance, lastSelectedId);
  // }
</script>

<section>
  <!-- List of drawn polygons -->
  <DrawnPolygonsList polygons={$filters.polygons} />

  <!-- Leaflet Map Component -->
  <Map options={mapOptions} bind:instance={mapInstance}>
    <!-- OpenStreetMap Tile Layer -->
    <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />

    <!-- Property Markers Component -->
    <PropertyMarkers on:openSideNote />

    <!-- Drawn Polygons Component -->
    <DrawnPolygons {drawingPolygonCoords} />

    <!-- User Polygons Component -->
    <!-- <UserPolygons /> -->
  </Map>
</section>

<style>
  section {
    width: 100%;
    height: 100%;
  }

  /* Global overrides of Leaflet popup styles */
  :global(.leaflet-popup-content-wrapper) {
    padding: 0;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.4);
  }

  :global(.leaflet-popup-content) {
    margin: 0;
    line-height: normal;
    min-height: 1px;
    width: max-content !important;
  }

  :global(.leaflet-popup-content p) {
    margin: 0;
  }
</style>
