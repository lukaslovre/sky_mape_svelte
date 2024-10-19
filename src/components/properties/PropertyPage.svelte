<script lang="ts">
  import type { MenuItem, Property } from "../../types";
  import { filteredProperties } from "../../stores/store";
  import { sortProperties } from "../../utils/properties";
  import PropertyForm from "./PropertyForm/PropertyForm.svelte";
  import Header1 from "../common/Header1.svelte";
  import Table from "../tables/propertiesTable/Table.svelte";
  import PropertyMenubar from "./PropertyMenubar.svelte";
  import { propertyFormStore } from "../../stores/propertiesFormStore";
  import { deleteProperty } from "../../models/Properties";

  // Property sorting
  let sortOption: keyof Property | null = null;
  $: sortedProperties = sortProperties($filteredProperties, sortOption);
  function handleChangeSortOption(event: CustomEvent<keyof Property>) {
    sortOption = event.detail;
  }

  // Property filtering
  let showForm: boolean = false;

  function handleItemClick(event: CustomEvent<MenuItem>) {
    const buttonLabel = event.detail.label;
    console.log(`${buttonLabel} label clicked.`);

    if (buttonLabel === "Dodaj") {
      showForm = true;
    } else if (buttonLabel === "Spremi kao tablicu") {
      console.log("Spremi kao tablicu");
    } else if (buttonLabel === "Uredi") {
      if (selectedPropertyIds.length !== 1) return;

      const selectedProperty = findSelectedProperty(selectedPropertyIds[0]);

      if (selectedProperty) {
        propertyFormStore.setFieldValues(selectedProperty);
        showForm = true;
      }
    } else if (buttonLabel === "Obriši") {
      if (selectedPropertyIds.length === 0) return;

      // Create a new array of promises
      const promises = selectedPropertyIds.map(async (id) => {
        await deleteProperty(id);
      });

      Promise.all(promises)
        .then(() => {
          alert("Nekretnine obrisane");
        })
        .catch((err) => {
          console.error("Error deleting properties:", err);
        });
    } else {
      console.log("Unknown button pressed in the PropertyPage menubar");
    }
  }

  function findSelectedProperty(id: string) {
    return $filteredProperties.find((property) => property.id === id);
  }

  // Table specific
  let selectedPropertyIds: string[] = [];

  function handleCheckboxChange(event: CustomEvent<string[]>) {
    console.log(event.detail);
    selectedPropertyIds = event.detail;
  }
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  {#if !showForm}
    <PropertyMenubar
      selectedPropertiesLength={selectedPropertyIds.length}
      {handleItemClick}
      on:sortProperties={handleChangeSortOption}
    />
  {/if}

  {#if showForm}
    <PropertyForm close={() => (showForm = false)} />
  {:else}
    <Table
      showHeader={true}
      data={sortedProperties}
      on:checkboxesChanged={handleCheckboxChange}
    />
  {/if}
</div>

<style>
  .properties-container {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }
</style>
