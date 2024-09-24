<script lang="ts">
  import { propertiesBoundingBox } from "../../../stores/store";

  export let mapInstance: L.Map | undefined;

  function fitBounds() {
    if (!mapInstance || !$propertiesBoundingBox) return;

    mapInstance.fitBounds($propertiesBoundingBox, { maxZoom: 15 }); // exportat možda?
  }
</script>

<button class="fit-bounds-button" on:click={fitBounds}>Center</button>

<style>
  .fit-bounds-button {
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);

    font-weight: 600;
    font-size: 0.875rem;
  }
</style>
