<script lang="ts">
  import type { Property } from "../../types";
  import PropertyCard from "./PropertyCard.svelte";
  import PropertyPageButtons from "./PropertyPageButtons.svelte";
  import { filteredProperties } from "../../store";
  import { sortProperties } from "../../utils/propertes";
  import Header1 from "../General components/Header1.svelte";

  // Property sorting

  let sortOption: keyof Property | null = null;

  function setSortOption(option: keyof Property) {
    sortOption = option;
  }
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  <PropertyPageButtons {setSortOption} />

  <div class="properties-grid-container">
    {#each sortProperties($filteredProperties, sortOption) as property (property.id)}
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

  .properties-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }
</style>
