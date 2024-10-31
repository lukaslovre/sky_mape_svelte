<script lang="ts">
  import { properties, selectedPropertyIds } from "../../stores/store";
  import type { Property } from "../../types";
  import PropertyActionButtons from "./PropertyActionButtons.svelte";
  import PropertyInformation from "./PropertyInformation.svelte";
  import PropertyListNavigator from "./PropertyListNavigator.svelte";

  $: property = $properties.filter((property) =>
    $selectedPropertyIds.includes(property.id)
  )[0];

  $: console.log(property);
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
