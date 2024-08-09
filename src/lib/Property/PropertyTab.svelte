<script>
  import SecondaryButton from "../General components/SecondaryButton.svelte";
  import PropertyCard from "./PropertyCard.svelte";

  import { filteredProperties } from "../../store";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SortIcon from "../../assets/icons/SortIcon.svelte";
</script>

<div class="properties-container">
  <h2>Popis nekretnina</h2>

  <div class="buttons-container">
    <SecondaryButton text="Spremi novu nekretninu">
      <SaveIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>

    <SecondaryButton text="Sortiraj">
      <SortIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>
  </div>
  <div class="properties-grid-container">
    {#each $filteredProperties as property (property.id)}
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
