<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import L, { LatLng, map } from "leaflet";
  import { Map, TileLayer, Marker, Popup, Icon, Polygon } from "sveaflet";
  import { mapOptions, markerOptions } from "../assets/mapConfigValues";
  import type { Property } from "../types";
  import PropertyCard from "./Property/PropertyCard.svelte";

  const dispatch = createEventDispatcher();

  export let properties: Property[];
  export let filteredProperties: Property[];
  export let favorites: Property["id"][];
  export let isDrawing: boolean;
  export let polygons: LatLng[][];

  // Array that stores the coordinates of the polygon currently being drawn
  let drawingPoligonCoords: LatLng[] = [];

  // When the map instance is available, add a click event listener to draw polygons
  $: if (mapInstance) {
    mapInstance.on("click", addClickToPolygons);
    mapInstance.on("popupclose", () => {
      selectedPropertyId = null;
    });
  }
  // When the drawing state changes, save the polygon if drawing is finished
  $: if (isDrawing === false) {
    if (drawingPoligonCoords.length < 3) {
      drawingPoligonCoords = [];
    } else if (drawingPoligonCoords.length >= 3) {
      savePolygon();
    }
  }

  let mapInstance: L.Map | undefined;
  let markerInstances: { [key: Property["id"]]: L.Marker } = {};
  export let selectedPropertyId: Property["id"] | null;
  $: {
    console.log(markerInstances);

    if (Object.keys(markerInstances).length > 0) {
      Object.keys(markerInstances).forEach((key) => {
        const marker = markerInstances[key];

        marker.on("click", () => {
          console.log(`Marker clicked: ${key}`);
          selectedPropertyId = key;
        });
      });
    }
  }

  $: if (selectedPropertyId) {
    // move the map to the selected property
    const selectedProperty = properties.find((p) => p.id === selectedPropertyId);
    if (selectedProperty) {
      mapInstance?.panTo(selectedProperty.latlng);
    }
  }

  function savePolygon() {
    if (drawingPoligonCoords.length === 0) return;

    dispatch("saveNewPolygon", drawingPoligonCoords);

    drawingPoligonCoords = [];
  }

  function deletePolygon(polygon: LatLng[]) {
    polygons = polygons.filter((p) => p !== polygon);

    dispatch("setPolygons", polygons);
  }

  function addClickToPolygons(e: L.LeafletMouseEvent) {
    if (isDrawing === false) return;

    drawingPoligonCoords = [...drawingPoligonCoords, e.latlng];
  }
</script>

<section>
  <Map options={mapOptions} bind:instance={mapInstance}>
    <TileLayer urlTemplate={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />

    {#each properties as property (property.id)}
      <Marker
        latlng={property.latlng}
        options={{ opacity: filteredProperties.includes(property) ? 1 : 0.25 }}
        bind:instance={markerInstances[property.id]}
      >
        <Icon
          options={{
            ...markerOptions,
            // iconUrl: `/${property.type.toLowerCase()}${favorites.includes(property.id) ? "-favorited" : ""}.png`,
            iconUrl: `/${property.type.toLowerCase()}.png`,
          }}
        />
        <Popup
          options={{
            closeButton: false,
            maxWidth: 1000,
          }}
        >
          <PropertyCard
            {property}
            isFavorite={favorites.includes(property.id)}
            toggleFavorite={() => {}}
          />
        </Popup>
      </Marker>
    {/each}

    <!-- Draw all polygons -->
    {#each polygons as poligon}
      <Polygon latLngs={poligon}>
        <Popup>
          <button
            type="button"
            on:click={() => {
              deletePolygon(poligon);
            }}>Obriši</button
          >
        </Popup>
      </Polygon>
    {/each}

    <!-- Draw the polygon that is currently being drawn -->
    <Polygon latLngs={drawingPoligonCoords} />
  </Map>
</section>

<style>
  section {
    /* flex: 1; */
    width: 100%;
    height: 100%;
  }

  /* Global overrides of leaflet defaults */
  :global(.leaflet-popup-content-wrapper) {
    padding: 0;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.4);
  }

  :global(.leaflet-popup-content) {
    margin: 0;
    line-height: normal;
    min-height: 1px;
  }

  :global(.leaflet-popup-content p) {
    margin: 0;
  }
</style>
