<script lang="ts">
  import { Map, Polygon, TileLayer } from "sveaflet";
  import { mapOptions } from "../../lib/config/map";
  import { filtersStore } from "../../lib/stores/filtersStore.svelte";
  import { getBoundsForBounds } from "../../lib/utils/bounds";
  import { Polyline } from "leaflet";

  //   interface Props {}

  //   let {}: Props = $props();

  let mapInstance: L.Map | undefined = $state();

  // Set bounds
  $effect(() => {
    if (!mapInstance) return;

    const polygonsObjects = filtersStore.filters.polygons.map(
      (polygon) => new Polyline(polygon)
    );

    const boundsForAllPolygons = polygonsObjects.map((polygon) => polygon.getBounds());

    const polygonsBoundingBox = getBoundsForBounds(boundsForAllPolygons);

    if (!polygonsBoundingBox) return;

    mapInstance.fitBounds(polygonsBoundingBox, {
      maxZoom: 15,
      padding: [20, 20],
    });
  });
</script>

<Map
  options={{
    ...mapOptions,
    zoomControl: false,
  }}
  bind:instance={mapInstance}
>
  <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />

  {#each filtersStore.filters.polygons as polygon}
    <Polygon latLngs={polygon} />
  {/each}
</Map>
