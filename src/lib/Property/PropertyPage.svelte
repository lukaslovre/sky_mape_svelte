<script lang="ts">
  import type { DialogType, Property } from "../../types";
  import PropertyCard from "./PropertyCard.svelte";
  import PropertyPageButtons from "./PropertyPageButtons.svelte";
  import { filteredProperties } from "../../stores/store";
  import { sortProperties } from "../../utils/propertes";
  import Header1 from "../General components/Header1.svelte";

  export let setDialog: (dialog: DialogType | null) => void;

  // Property sorting

  let sortOption: keyof Property | null = null;

  function setSortOption(option: keyof Property) {
    sortOption = option;
  }
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  <PropertyPageButtons {setSortOption} {setDialog} />

  <div class="properties-grid-container">
    {#each sortProperties($filteredProperties, sortOption) as property (property.id)}
      <PropertyCard {property} on:openSideNote />
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

  .properties-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }
</style>
