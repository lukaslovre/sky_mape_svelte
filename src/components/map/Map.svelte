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

  let mapInstance: L.Map | undefined = $state();
  let drawingPolygonCoords: LatLng[] = $state([]);
  let userPolygonsVisibility: boolean = $state(false);
  let eventListenersSet: boolean = $state(false);

  // Event Handlers
  function handleMapClick(e: L.LeafletMouseEvent) {
    if (!mapInstance) return;

    // Check if the click is near the start point
    if (isClickNearStart(mapInstance, e.latlng, drawingPolygonCoords)) {
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

  function handlePopupOpen(e: any) {
    console.log(e);
  }

  function handleMouseMove(e: L.LeafletMouseEvent) {
    if (!$isDrawing || drawingPolygonCoords.length === 0) return;

    // Update the last coordinate with the current mouse position for dynamic drawing
    drawingPolygonCoords = [...drawingPolygonCoords.slice(0, -1), e.latlng];
  }

  function handleKeyPress(e: L.LeafletKeyboardEvent) {
    const key = e.originalEvent.key;

    if (key === "Enter") {
      if ($isDrawing) {
        isDrawing.set(false);
      }
    } else if (key === "c") {
      fitViewToFilteredProperties(mapInstance, $propertiesBoundingBox);
    } else if (key === "d") {
      isDrawing.set(true);
    }
  }

  function setEventListeners(mapInstance: L.Map) {
    mapInstance.on("click", handleMapClick);
    mapInstance.on("popupclose", handlePopupClose);
    // mapInstance.on("popupopen", handlePopupOpen);
    mapInstance.on("mousemove", handleMouseMove);
    mapInstance.on("keypress", handleKeyPress);
  }

  $effect(() => {
    if (mapInstance && !eventListenersSet) {
      setEventListeners(mapInstance);
      eventListenersSet = true;
    }
  });

  // Other
  // Reactive statement to handle drawing state changes
  $effect(() => {
    if (!$isDrawing && drawingPolygonCoords.length > 0) handleFinishDrawing();
  });

  function handleFinishDrawing() {
    if (!mapInstance) return;

    // Must have at least 4 coordinates because 1 will be removed before saving
    if (drawingPolygonCoords.length > 3) {
      // Remove the last temporary coordinate before saving
      drawingPolygonCoords.pop();
      savePolygon(drawingPolygonCoords);
    }

    // Reset drawing coordinates
    drawingPolygonCoords = [];
  }

  function toggleUserPolygonsVisibility() {
    userPolygonsVisibility = !userPolygonsVisibility;
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
    <PropertyMarkers />

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
