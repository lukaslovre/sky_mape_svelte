<script lang="ts">
  import { filteredProperties, selectedPropertyIds } from "../../stores/store";
  import type { Property } from "../../types";
  import ArrowButton from "./ArrowButton.svelte";

  $: filteredCount = $filteredProperties.length;
  $: currentIndex = getCurrentIndex($filteredProperties, $selectedPropertyIds) + 1; // 1-based index

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
    if ($filteredProperties.length === 0) return;

    console.log("Navigating", direction);

    const currentIndexZeroBased = getCurrentIndex(
      $filteredProperties,
      $selectedPropertyIds
    );

    let newIndex: number;

    if (direction === "next") {
      newIndex = (currentIndexZeroBased + 1) % $filteredProperties.length;
    } else {
      newIndex =
        (currentIndexZeroBased - 1 + $filteredProperties.length) %
        $filteredProperties.length;
    }

    const newPropertyId = $filteredProperties[newIndex].id;
    selectedPropertyIds.set([newPropertyId]);
  }
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
