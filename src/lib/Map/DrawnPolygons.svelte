<script lang="ts">
  import type { LatLng } from "leaflet";
  import { filters, removePolygon } from "../../store";
  import { Polygon } from "sveaflet";
  import Popup from "../General components/Popup.svelte";

  export let drawingPolygonCoords: LatLng[];

  // Function to handle polygon deletion
  function handleDelete(poligon: LatLng[]) {
    removePolygon(poligon);
  }
</script>

<!-- Draw the polygon that is currently being drawn -->
<Polygon latLngs={drawingPolygonCoords} />

<!-- Draw all polygons -->
{#each $filters.polygons as poligon}
  <Polygon latLngs={poligon} />
{/each}
