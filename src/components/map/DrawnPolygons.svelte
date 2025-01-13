<script lang="ts">
  import type { LatLng } from "leaflet";
  import { filters } from "../../stores/store";
  import { Polygon } from "sveaflet";

  interface Props {
    drawingPolygonCoords: LatLng[];
  }

  let { drawingPolygonCoords }: Props = $props();
</script>

<!-- Draw the polygon that is currently being drawn -->
<Polygon latLngs={drawingPolygonCoords} />

<!-- Draw all polygons -->
{#each $filters.polygons as poligon}
  <Polygon latLngs={poligon} />
{/each}
