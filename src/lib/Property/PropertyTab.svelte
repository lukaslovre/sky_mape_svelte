<script lang="ts">
  import SecondaryButton from "../General components/SecondaryButton.svelte";
  import PropertyCard from "./PropertyCard.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SortIcon from "../../assets/icons/SortIcon.svelte";
  import { filteredProperties } from "../../store";
  import type { Property } from "../../types";

  const sortOptions: (keyof Property)[] = ["surfaceArea", "price", "created"];

  let selectedSortOptionIndex: number = 0;

  function changeSortOption() {
    selectedSortOptionIndex = (selectedSortOptionIndex + 1) % sortOptions.length;
  }

  function sortProperties(
    properties: Property[],
    selectedSortOptionIndex: number
  ): Property[] {
    const sortOption = sortOptions[selectedSortOptionIndex];

    if (typeof properties[0][sortOption] === "number") {
      return properties.sort(
        (a, b) => (a[sortOption] as number) - (b[sortOption] as number)
      );
    } else {
      return properties.sort((a, b) => {
        if (a[sortOption] < b[sortOption]) return -1;
        if (a[sortOption] > b[sortOption]) return 1;
        return 0;
      });
    }
  }
</script>

<div class="properties-container">
  <h2>Popis nekretnina</h2>

  <div class="buttons-container">
    <SecondaryButton text="Spremi novu nekretninu">
      <SaveIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>

    <SecondaryButton
      text={`Sortiraj (po ${sortOptions[selectedSortOptionIndex]})`}
      onClick={changeSortOption}
    >
      <SortIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>
  </div>
  <div class="properties-grid-container">
    {#each sortProperties($filteredProperties, selectedSortOptionIndex) as property (property.id)}
      <PropertyCard {property} />
    {/each}
  </div>
</div>

<style>
  .properties-container {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }

  .buttons-container {
    display: flex;
    column-gap: 1.25rem;
  }

  .properties-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }
</style>
