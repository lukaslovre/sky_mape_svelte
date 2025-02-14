<script lang="ts">
  import type { LatLng } from "leaflet";
  import { CircleMarker } from "sveaflet";

  interface Props {
    drawingPolygonCoords: LatLng[];
  }

  let { drawingPolygonCoords }: Props = $props();
</script>

{#each drawingPolygonCoords as latLng}
  <CircleMarker
    {latLng}
    options={{
      radius: 5,
      fillOpacity: 1,
      color: "#0055cc",
    }}
  />
{/each}
