<script lang="ts">
  import { Marker, Icon, Popup } from "sveaflet";
  import L from "leaflet";
  import {
    favoriteProperties,
    filteredProperties,
    properties,
    selectedPropertyIds,
  } from "../../stores/store";
  import { markerOptions } from "../../assets/mapConfigValues";
  import { getIconForProperty } from "../../utils/propertyIcons";
  import type { Property } from "../../types";
  import PropertyCard from "../properties/PropertyCard.svelte";
  import { LatLng } from "leaflet";
  import { toggleSelectedProperty } from "../../stores/actions";

  // Marker instances for binding and event handling
  let markerInstances: { [key: Property["id"]]: L.Marker } = {};

  // When the properties change, update the marker instances
  $: if (Object.keys(markerInstances).length > 0) {
    setAppropriateMarkerIcons();
    setEventListeners();
  }
  // When the favorite properties change, update the marker icons
  $: if ($favoriteProperties) setAppropriateMarkerIcons();

  // Handler for marker click events
  function handleMarkerClick(propertyId: string, event: L.LeafletMouseEvent) {
    if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
      // Multi-select with Ctrl (Windows) or Command (Mac)
      toggleSelectedProperty(propertyId);
    } else {
      // Single select
      selectedPropertyIds.set([propertyId]);
    }
  }

  function setEventListeners() {
    Object.entries(markerInstances).forEach(([propertyId, marker]) => {
      marker.on("click", (event) => handleMarkerClick(propertyId, event));
    });
  }

  function setAppropriateMarkerIcons() {
    Object.entries(markerInstances).forEach(([propertyId, marker]) => {
      const property = $properties.find((p) => p.id === propertyId);
      if (!property) return;

      marker.setIcon(
        new L.Icon({
          ...markerOptions,
          iconUrl: getIconForProperty(
            property,
            $favoriteProperties.includes(property.id)
          ),
        })
      );
    });
  }
</script>

<!-- Iterate over each property and render a Marker -->
{#each $properties as property (property.id)}
  <Marker
    latLng={new LatLng(property.lat, property.lng)}
    options={{
      opacity: $filteredProperties.includes(property) ? 1 : 0.25,
      ...markerOptions,
    }}
    bind:instance={markerInstances[property.id]}
  >
    <!-- Popup component displaying the PropertyCard -->
    <Popup
      options={{
        closeButton: false,
      }}
    >
      <PropertyCard {property} on:openSideNote />
    </Popup>
  </Marker>
{/each}
