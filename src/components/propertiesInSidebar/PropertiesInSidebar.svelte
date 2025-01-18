<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Property } from "../../types";
  import PropertyActionButtons from "./PropertyActionButtons.svelte";
  import PropertyInformation from "./PropertyInformation.svelte";
  import PropertyListNavigator from "./PropertyListNavigator.svelte";

  let propertyList = $derived<Property[]>(
    dataStore.selectedPropertyIds.length > 1
      ? (dataStore.selectedPropertyIds.map((id) =>
          dataStore.properties.find((property) => property.id === id)
        ) as Property[])
      : dataStore.filteredProperties
  );
  let selectedPropertyIndex = $state<number>(0);
  let property = $derived(propertyList[selectedPropertyIndex]);

  function cycleThruPropertiesBy(steps: number) {
    if (steps === 0) return;

    selectedPropertyIndex =
      (selectedPropertyIndex + steps + propertyList.length + propertyList.length * 5) %
      propertyList.length;
  }
</script>

<section>
  <PropertyListNavigator
    currentIndex={selectedPropertyIndex}
    totalPropertiesCount={propertyList.length}
    {cycleThruPropertiesBy}
  />

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
