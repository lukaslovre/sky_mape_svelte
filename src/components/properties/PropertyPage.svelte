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
  $: removeUnfilteredPropertiesFromSelection($filteredProperties);

  function handleChangeSortOption(event: CustomEvent<keyof Property>) {
    sortOption = event.detail;
  }

  function removeUnfilteredPropertiesFromSelection(filteredProperties: Property[]) {
    selectedPropertyIds = selectedPropertyIds.filter((id) => {
      return filteredProperties.some((property) => property.id === id);
    });
  }

  // Property filtering
  let showForm: boolean = false;

  function handleItemClick(event: CustomEvent<MenuItem>) {
    const buttonLabel = event.detail.label; // Dodaj, Spremi kao tablicu, Uredi, Obriši
    console.log(`${buttonLabel} label clicked.`);

    switch (buttonLabel) {
      case "Dodaj":
        handleAdd();
        break;

      case "Spremi kao tablicu":
        handleSaveAsTable();
        break;

      case "Uredi":
        handleEdit();
        break;

      case "Obriši":
        handleDelete();
        break;

      default:
        console.log("Unknown button pressed in the PropertyPage menubar");
    }
  }

  // Shows the form for adding a new property
  function handleAdd() {
    propertyFormStore.clearFields();
    showForm = true;
  }

  // Alerts that saving as table is not implemented
  function handleSaveAsTable() {
    alert(`"Spremi kao tablicu" još nije implementirano.`);
  }

  // Handles editing of a selected property
  function handleEdit() {
    if (selectedPropertyIds.length !== 1) return;

    const selectedProperty = findSelectedProperty(selectedPropertyIds[0]);

    if (selectedProperty) {
      propertyFormStore.setFieldValues(selectedProperty);
      showForm = true;
    }
  }

  // Deletes selected properties
  function handleDelete() {
    if (selectedPropertyIds.length === 0) return;

    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${selectedPropertyIds.length} selected properties?`
    );
    if (!confirmDeletion) return;

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
  }

  // Util
  function findSelectedProperty(id: string) {
    return $filteredProperties.find((property) => property.id === id);
  }

  // Table specific
  let selectedPropertyIds: string[] = [];

  function handleCheckboxClick(propertyId: Property["id"], newState: boolean): void {
    // True = ON, False = OFF
    if (newState) {
      selectedPropertyIds = selectedPropertyIds.includes(propertyId)
        ? selectedPropertyIds
        : [...selectedPropertyIds, propertyId];
    } else {
      selectedPropertyIds = selectedPropertyIds.filter((id) => id !== propertyId);
    }
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

    <Table
      showHeader={true}
      data={sortedProperties}
      {handleCheckboxClick}
      {selectedPropertyIds}
    />
  {:else}
    <PropertyForm close={() => (showForm = false)} />
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
