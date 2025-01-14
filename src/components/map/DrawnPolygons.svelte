<script lang="ts">
  import type { LatLng } from "leaflet";
  import { Polygon } from "sveaflet";
  import { filtersStore } from "../../stores/filtersStore.svelte";

  interface Props {
    drawingPolygonCoords: LatLng[];
  }

  let { drawingPolygonCoords }: Props = $props();
</script>

<!-- Draw the polygon that is currently being drawn -->
<Polygon latLngs={drawingPolygonCoords} />

<!-- Draw all polygons -->
{#each filtersStore.filters.polygons as polygon}
  <Polygon latLngs={polygon} />
{/each}
