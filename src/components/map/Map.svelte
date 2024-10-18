<script lang="ts">
  import type { LatLng } from "leaflet";
  import {
    addClickToPolygons,
    addTemporaryProperty,
    panToPropertyById,
    resetSelectedProperty,
    saveLatLngToClipboard,
    isClickNearStart,
  } from "./utils/mapUtils";
  import {
    filters,
    isDrawing,
    propertiesBoundingBox,
    selectedPropertyIds,
  } from "../../stores/store";
  import DrawnPolygonsList from "./overlays/DrawnPolygonsList.svelte";
  import { Map, TileLayer } from "sveaflet";
  import { mapOptions } from "../../assets/mapConfigValues";
  import { fitViewToFilteredProperties, savePolygon } from "../../stores/actions";
  import FitBoundsButton from "./overlays/FitBoundsButton.svelte";
  import ShowUserPolygonsButton from "./overlays/ShowUserPolygonsButton.svelte";
  import PropertyMarkers from "./PropertyMarkers.svelte";
  import DrawnPolygons from "./DrawnPolygons.svelte";
  import UserPolygons from "./UserPolygons.svelte";

  let mapInstance: L.Map | undefined;
  let eventListenersSet: boolean = false;

  // Reactive variable to store drawing polygon coordinates
  let drawingPolygonCoords: LatLng[] = [];

  let userPolygonsVisibility: boolean = false;
  function toggleUserPolygonsVisibility() {
    userPolygonsVisibility = !userPolygonsVisibility;
  }

  // Event Handlers
  function handleMapClick(e: L.LeafletMouseEvent) {
    if (!mapInstance) return;

    // Check if the click is near the start point
    if (isClickNearStart(mapInstance, e.latlng, drawingPolygonCoords)) {
      handleFinishDrawing();
      isDrawing.set(false);
      return;
    }

    // Update drawing polygon coordinates
    drawingPolygonCoords = addClickToPolygons(e, drawingPolygonCoords);

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
      if (!$isDrawing || drawingPolygonCoords.length === 0) return;
      // Update the last coordinate with the current mouse position for dynamic drawing
      drawingPolygonCoords = [...drawingPolygonCoords.slice(0, -1), e.latlng];
    });

    mapInstance.on("keypress", (e: L.LeafletKeyboardEvent) => {
      const key = e.originalEvent.key;
      console.log(key);
      if (key === "Enter") {
        if ($isDrawing) {
          handleFinishDrawing();
          isDrawing.set(false);
        }
      } else if (key === "c") {
        fitViewToFilteredProperties(mapInstance, $propertiesBoundingBox);
      }
    });
  }

  function handleFinishDrawing() {
    if (!mapInstance) return;

    if (drawingPolygonCoords.length > 3) {
      // Remove the last temporary coordinate before saving
      drawingPolygonCoords.pop();
      savePolygon(drawingPolygonCoords);
    }

    // Reset drawing coordinates
    drawingPolygonCoords = [];
  }

  $: if (mapInstance && !eventListenersSet) {
    setEventListeners(mapInstance);
    eventListenersSet = true;
  }

  // Reactive statement to handle drawing state changes
  $: if (!$isDrawing) {
    handleFinishDrawing();
  }
</script>

<section>
  <div class="map-controls-container">
    <FitBoundsButton {mapInstance} />
    <ShowUserPolygonsButton {userPolygonsVisibility} {toggleUserPolygonsVisibility} />
  </div>
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
    {#if userPolygonsVisibility}
      <UserPolygons />
    {/if}
  </Map>
</section>

<style>
  section {
    position: relative;
    width: 100%;
    height: calc(100vh - 5rem);
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

  .map-controls-container {
    position: absolute;
    z-index: 401;
    top: 1rem;
    left: 4rem;

    display: flex;
    gap: 1rem;
  }
</style>
