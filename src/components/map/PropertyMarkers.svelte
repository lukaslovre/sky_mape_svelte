<script lang="ts">
  import { dataStore } from "../../lib/stores/store.svelte";
  import PropertyMarker from "./PropertyMarker.svelte";
</script>

<!-- Iterate over each property and render a Marker -->
{#each dataStore.properties as property (property.id)}
  <PropertyMarker {property} />
{/each}
