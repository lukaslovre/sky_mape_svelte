<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Property } from "../../types";
  import PropertyActionButtons from "./PropertyActionButtons.svelte";
  import PropertyInformation from "./PropertyInformation.svelte";
  import PropertyListNavigator from "./PropertyListNavigator.svelte";

  let property: Property = $derived(
    dataStore.properties.filter((property) =>
      dataStore.selectedPropertyIds.includes(property.id)
    )[0]
  );
</script>

<section>
  <PropertyListNavigator />
  {#if property}
    <PropertyActionButtons {property} />
    <PropertyInformation {property} />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
