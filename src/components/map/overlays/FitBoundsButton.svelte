<script lang="ts">
  import { fitViewToFilteredProperties } from "../../../lib/stores/actions";

  interface Props {
    mapInstance: L.Map | undefined;
  }

  let { mapInstance }: Props = $props();

  function fitBounds() {
    fitViewToFilteredProperties(mapInstance);
  }
</script>

<button class="fit-bounds-button" onclick={fitBounds}>
  Centriraj <span class="fit-bounds-button-shortcut">[C]</span>
</button>

<style>
  .fit-bounds-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);

    font-weight: 600;
    font-size: 0.875rem;
  }

  .fit-bounds-button-shortcut {
    font-size: 0.75rem;
    font-weight: 700;
    color: hsl(0, 0%, 50%);
  }
</style>
