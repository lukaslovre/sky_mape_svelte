<script lang="ts">
  import type { Property, UserData } from "../types";
  import PropertyCard from "./Property/PropertyCard.svelte";
  import { createEventDispatcher, onDestroy } from "svelte";
  import L, { LatLng, map, type MapOptions } from "leaflet";
  import { Map, TileLayer, Marker, Popup, Icon, Polygon } from "sveaflet";
  import { mapOptions, markerOptions } from "../assets/mapConfigValues";
  import {
    properties,
    filteredProperties,
    filters,
    savePolygon,
    favoriteProperties,
    propertiesBoundingBox,
    selectedPropertyIds,
    toggleSelectedProperty,
    users,
  } from "../store";
  import { getIconForProperty } from "../utils/propertyIcons";
  import DrawnPolygonsList from "./DrawnPolygonsList.svelte";

  const dispatch = createEventDispatcher();

  export let isDrawing: boolean;

  let isUnmounting = false;

  // Array that stores the coordinates of the polygon currently being drawn
  let drawingPoligonCoords: LatLng[] = [];

  // Instances of leaflet elements
  let mapInstance: L.Map | undefined;
  let markerInstances: { [key: Property["id"]]: L.Marker } = {};

  // When the map instance is available, add a click event listener to draw polygons
  $: if (mapInstance) {
    mapInstance.on("click", addClickToPolygons);
    mapInstance.on("click", saveLatLngToClipboard); // Alt
    mapInstance.on("click", addTemporaryProperty); // Ctrl
    mapInstance.on("popupclose", resetSelectedProperty);

    mapInstance.on("mousemove", (e) => {
      if (isDrawing === false) return;
      if (drawingPoligonCoords.length === 0) return;

      drawingPoligonCoords = [...drawingPoligonCoords.slice(0, -1), e.latlng];
    });
  }

  $: if ($propertiesBoundingBox !== null && mapInstance !== undefined) {
    console.log("Fitting bounds");
    mapInstance.fitBounds($propertiesBoundingBox);
  }

  // When the markerInstances are available, add click event listeners to each marker
  $: if (Object.keys(markerInstances).length > 0) {
    console.log("MarkerInstances changed", markerInstances);
    Object.keys(markerInstances).forEach((propertyId) => {
      const marker = markerInstances[propertyId];

      addClickEventToMarker(marker, propertyId);
      setAppropriateMarkerIcon(propertyId);
    });
  }

  // When the drawing state changes, save the polygon if drawing is finished
  $: if (isDrawing === false) {
    savePolygonINS();
    if ($propertiesBoundingBox !== null) {
      mapInstance?.fitBounds($propertiesBoundingBox);
    }
  }

  // When the selected property changes, pan to the selected property
  $: if ($selectedPropertyIds)
    panToPropertyById($selectedPropertyIds[$selectedPropertyIds.length - 1] || null);

  // When favoriteProperties changes, update the marker icons
  $: if ($favoriteProperties) setAppropriateMarkerIcons();

  function savePolygonINS() {
    if (drawingPoligonCoords.length < 3) {
      drawingPoligonCoords = [];
      return;
    }

    drawingPoligonCoords.pop();

    savePolygon(drawingPoligonCoords);
    drawingPoligonCoords = [];
  }

  function deletePolygon(polygon: LatLng[]) {
    filters.update((f) => {
      return {
        ...f,
        polygons: f.polygons.filter((p) => p !== polygon),
      };
    });
  }

  function addClickToPolygons(e: L.LeafletMouseEvent) {
    if (isDrawing === false) return;

    if (drawingPoligonCoords.length === 0) {
      drawingPoligonCoords = [e.latlng, e.latlng];
    } else {
      drawingPoligonCoords = [...drawingPoligonCoords, e.latlng];
    }
  }

  function resetSelectedProperty() {
    if (!isUnmounting) {
      selectedPropertyIds.set([]);
    }
  }

  function saveLatLngToClipboard(e: L.LeafletMouseEvent) {
    if (e.originalEvent.shiftKey) {
      navigator.clipboard.writeText(`${e.latlng.lat}, ${e.latlng.lng}`).then(
        () => {
          console.log("Lat and Lng copied to clipboard");
        },
        (err) => {
          console.error("Failed to copy: ", err);
          alert(`${e.latlng.lat}, ${e.latlng.lng}`);
        }
      );
    }
  }

  function addTemporaryProperty(e: L.LeafletMouseEvent) {
    if (e.originalEvent.ctrlKey) {
      properties.update((p) => {
        return [
          ...p,
          {
            // generate uuid
            id: `temporary-${Math.random().toString(36).slice(2)}`,
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            type: "House",
            price: 0,
            description: "",
            action: "Sale",
            imgUrl: [""],
            title: "Temporary property",
            surfaceArea: 0,
            websiteUrl: "",
            hiddenOnWebsite: false,

            created: "",
            updated: "",
            collectionId: "",
            collectionName: "",
          },
        ];
      });
    }
  }

  function panToPropertyById(id: Property["id"] | null) {
    if (!id) return;

    const property = $properties.find((p) => p.id === id);
    if (property) {
      mapInstance?.panTo(new LatLng(property.lat, property.lng));
    }
  }

  function addClickEventToMarker(marker: L.Marker, propertyId: Property["id"]) {
    marker.on("click", (e) => {
      console.log(`Marker clicked: ${propertyId}`);

      // multi select
      if (e.originalEvent.ctrlKey) {
        console.log("Ctrl key pressed");

        toggleSelectedProperty(propertyId);
      } else {
        // single select
        selectedPropertyIds.set([propertyId]);
      }

      console.log("Selected properties: ", $selectedPropertyIds);
    });
  }

  function setAppropriateMarkerIcons() {
    Object.keys(markerInstances).forEach((propertyId) => {
      setAppropriateMarkerIcon(propertyId);
    });
  }

  function setAppropriateMarkerIcon(propertyId: Property["id"]) {
    const property = $properties.find((p) => p.id === propertyId);
    const marker = markerInstances[propertyId];

    if (!property || !marker) return;

    marker.setIcon(
      new L.Icon({
        ...markerOptions,
        iconUrl: getIconForProperty(property, $favoriteProperties),
      })
    );
  }

  onDestroy(() => {
    isUnmounting = true;
  });

  const getColorForUser = (user: UserData) => {
    // generate hash from user id
    const hash = user.id.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    // generate color from hash
    const color = `hsl(${hash % 360}, 100%, 40%)`;

    return color;
  };
</script>

<section>
  <DrawnPolygonsList polygons={$filters.polygons} />

  <Map options={mapOptions} bind:instance={mapInstance}>
    <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />

    {#each $properties as property (property.id)}
      <Marker
        latLng={new LatLng(property.lat, property.lng)}
        options={{ opacity: $filteredProperties.includes(property) ? 1 : 0.25 }}
        bind:instance={markerInstances[property.id]}
      >
        <!-- <Icon
          options={{
            ...markerOptions,
            // iconUrl: `/${property.type.toLowerCase()}${favorites.includes(property.id) ? "-favorited" : ""}.png`,
            iconUrl: `/${property.type.toLowerCase()}.png`,
          }}
        /> -->
        <Popup
          options={{
            closeButton: false,
            maxWidth: 500,
          }}
        >
          <PropertyCard {property} on:openSideNote />
        </Popup>
      </Marker>
    {/each}

    <!-- Draw all polygons -->
    {#each $filters.polygons as poligon}
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

    <!-- Draw all user polygons -->
    {#each $users as user}
      {#each user.filters?.polygons || [] as poligon}
        <!-- Draw a polygon -->
        <Polygon
          latLngs={poligon}
          options={{
            color: getColorForUser(user),
          }}
        />
      {/each}
    {/each}
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
