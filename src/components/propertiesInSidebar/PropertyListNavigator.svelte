<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Property } from "../../types";
  import ArrowButton from "./ArrowButton.svelte";

  function getCurrentIndex(
    filteredProperties: Property[],
    currentlySelectedPropertyIds: string[]
  ) {
    if (currentlySelectedPropertyIds.length === 0) {
      return -1; // No property selected
    }

    const currentlySelectedPropertyId = currentlySelectedPropertyIds[0];
    const index = filteredProperties.findIndex(
      (property) => property.id === currentlySelectedPropertyId
    );

    return index;
  }

  function handleNavigation(direction: "next" | "previous") {
    if (dataStore.filteredProperties.length === 0) return;

    console.log("Navigating", direction);

    const currentIndexZeroBased = getCurrentIndex(
      dataStore.filteredProperties,
      dataStore.selectedPropertyIds
    );

    let newIndex: number;

    if (direction === "next") {
      newIndex = (currentIndexZeroBased + 1) % dataStore.filteredProperties.length;
    } else {
      newIndex =
        (currentIndexZeroBased - 1 + dataStore.filteredProperties.length) %
        dataStore.filteredProperties.length;
    }

    const newPropertyId = dataStore.filteredProperties[newIndex].id;
    dataStore.selectedPropertyIds = [newPropertyId];
  }
  let filteredCount = $derived(dataStore.filteredProperties.length);
  let currentIndex = $derived(
    getCurrentIndex(dataStore.filteredProperties, dataStore.selectedPropertyIds) + 1
  ); // 1-based index
</script>

<div class="property-list-navigator">
  <ArrowButton direction="left" onClick={() => handleNavigation("previous")} />
  <p>{currentIndex}/{filteredCount}</p>
  <ArrowButton direction="right" onClick={() => handleNavigation("next")} />
</div>

<style>
  .property-list-navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .property-list-navigator p {
    color: #1a1a1a;
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
