<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Property } from "../../types";
  import PropertyActionButtons from "./PropertyActionButtons.svelte";
  import PropertyInformation from "./PropertyInformation.svelte";
  import PropertyListNavigator from "./PropertyListNavigator.svelte";

  // If >1 selected property, show selected properties, else show filtered properties
  let propertyList = $derived<Property[]>(
    dataStore.selectedPropertyIds.length > 1
      ? (dataStore.selectedPropertyIds.map((id) =>
          dataStore.properties.find((property) => property.id === id)
        ) as Property[])
      : dataStore.filteredProperties
  );
  let property = $derived(
    dataStore.properties.find((p) => p.id === dataStore.focusedPropertyId)
  );
  let selectedPropertyIndex = $derived(
    propertyList.findIndex((p) => p.id === dataStore.focusedPropertyId)
  );

  function cycleThruPropertiesBy(steps: number) {
    if (steps === 0) return;

    const newIndex =
      (selectedPropertyIndex + steps + propertyList.length * 4) % propertyList.length;

    // if only 1 selected property, set the new focused property as selected
    if (dataStore.selectedPropertyIds.length === 1) {
      dataStore.setSelectedPropertyIds([propertyList[newIndex].id]);
    } else {
      dataStore.focusedPropertyId = propertyList[newIndex].id;
    }
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
