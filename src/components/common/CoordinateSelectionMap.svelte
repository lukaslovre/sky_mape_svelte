<!-- This is a CoordinateSelectionMap.svelte component -->
<!-- It is put inside a form to provide a graphical/intuitive way of selecting coordinates (Lat & Lng) -->
<!-- The component is a map that is interactive and allows the user to click on it and get the coordinates of the clicked location -->
<!-- The component accepts the following props:
  - lat: number - the latitude of the location that should be displayed on the map
  - lng: number - the longitude of the location that should be displayed on the map
  - onCoordinatesSelected: (lat: number, lng: number) => void - a function that will be called when the user selects a location on the map
  - zoom: number - the zoom level of the map  
-->

<script lang="ts">
  import { Map, Marker, TileLayer } from "sveaflet";
  import { mapOptions, markerOptions } from "../../assets/mapConfigValues";
  import { onDestroy } from "svelte";
  import L from "leaflet";

  export let lat: number;
  export let lng: number;
  export let onCoordinatesSelected: (lat: number, lng: number) => void;
  export let zoom: number = 13;
  export let iconUrl: string = "";

  let map: L.Map | undefined = undefined;
  let marker: L.Marker | undefined = undefined;

  function clickHandler(e: L.LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    onCoordinatesSelected(lat, lng);
  }

  $: if (map) {
    map.on("click", clickHandler);
  }

  $: if (marker) {
    if (iconUrl) {
      marker.setIcon(
        new L.Icon({
          ...markerOptions,
          iconUrl: iconUrl,
        })
      );
    }
  }

  onDestroy(() => {
    if (map) {
      map.off("click", clickHandler);
    }
  });
</script>

<Map
  options={{
    ...mapOptions,
    zoom: zoom,
    center: [lat, lng],
  }}
  bind:instance={map}
>
  <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />

  <Marker latLng={[lat, lng]} bind:instance={marker} />
</Map>
