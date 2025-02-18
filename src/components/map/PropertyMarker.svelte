<script lang="ts">
  import { Marker, Popup } from "sveaflet";
  import type { Property } from "../../types";
  import { Icon, LatLng } from "leaflet";
  import { dataStore } from "../../lib/stores/store.svelte";
  import { markerOptions } from "../../lib/config/map";
  import PropertyCard from "../properties/PropertyCard.svelte";
  import { getIconForProperty } from "../../lib/utils/propertyIcons";
  import { toggleSelectedProperty } from "../../lib/stores/actions";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  let markerInstance: L.Marker | undefined = $state();
  let eventListenersSet: boolean = $state(false);

  // When markerInstance is ready, set event listeners
  $effect(() => {
    if (markerInstance && !eventListenersSet) {
      setEventListeners(markerInstance);
      eventListenersSet = true;
    }
  });

  // Update the marker icon to reflect the property's state
  $effect(() => {
    if (markerInstance) {
      markerInstance.setIcon(
        new Icon({
          ...markerOptions,
          iconUrl: getIconForProperty(
            property,
            dataStore.favoriteProperties.includes(property.id),
            dataStore.selectedPropertyIds.includes(property.id)
          ),
        })
      );
    }
  });

  //   If this marker/property becomes focused programatically open popup
  $effect(() => {
    if (markerInstance) {
      if (dataStore.focusedPropertyId === property.id) {
        markerInstance.openPopup();
      } else if (markerInstance.isPopupOpen()) {
        markerInstance.closePopup();
      }
    }
  });

  function setEventListeners(markerInstance: L.Marker) {
    markerInstance.on("click", handleClick);
  }

  function handleClick(event: L.LeafletMouseEvent) {
    // console.log("Marker MouseEvent", event);

    const shiftPressed = event.originalEvent.shiftKey;

    if (shiftPressed) {
      // Multi select
      toggleSelectedProperty(property.id);
    } else {
      // Single select
      dataStore.setSelectedPropertyIds([property.id]);
    }

    // Last clicked is focused
    dataStore.focusedPropertyId = property.id;
  }
</script>

<Marker
  latLng={new LatLng(property.lat, property.lng)}
  options={{
    // opacity: dataStore.filteredProperties.includes(property) ? 1 : 0.25, // Before the non-filtered properties were lower opacity
    ...markerOptions,
  }}
  bind:instance={markerInstance}
>
  <!-- Popup component displaying the PropertyCard -->
  <Popup
    options={{
      closeButton: false,
    }}
    data-property-id={property.id}
  >
    <PropertyCard {property} />
  </Popup>
</Marker>
