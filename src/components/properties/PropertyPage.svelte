<script lang="ts">
  import type { DialogType, Property } from "../../types";
  import PropertyCard from "./PropertyCard.svelte";
  import PropertyPageButtons from "./PropertyPageButtons.svelte";
  import { filteredProperties } from "../../stores/store";
  import { sortProperties } from "../../utils/properties";
  import PropertyForm from "./PropertyForm/PropertyForm.svelte";
  import { propertyFormFields } from "./PropertyForm/PropertyFormUtils";
  import Header1 from "../common/Header1.svelte";

  // Property sorting

  let sortOption: keyof Property | null = null;

  let showForm = false;

  const fields = propertyFormFields.map((field) => ({ ...field }));

  function setSortOption(option: keyof Property) {
    sortOption = option;
  }
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  <PropertyPageButtons
    {setSortOption}
    setDialog={() => {
      showForm = !showForm;
    }}
  />

  {#if showForm}
    <PropertyForm {fields} />
  {:else}
    <div class="properties-grid-container">
      {#each sortProperties($filteredProperties, sortOption) as property (property.id)}
        <PropertyCard {property} on:openSideNote />
      {/each}
    </div>
  {/if}
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
