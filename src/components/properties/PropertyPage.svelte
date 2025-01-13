<script lang="ts">
  import type { MenuItem, Property } from "../../types";
  import { filteredProperties } from "../../stores/store";
  import { sortProperties } from "../../utils/properties";
  import PropertyForm from "./PropertyForm/PropertyForm.svelte";
  import Header1 from "../common/Header1.svelte";
  import Table from "../tables/propertiesTable/Table.svelte";
  import PropertyMenubar from "./PropertyMenubar.svelte";
  import { propertyFormStore } from "../../stores/propertiesFormStore.svelte";
  import { deleteProperty } from "../../models/Properties";

  // Property sorting
  let showForm: boolean = $state(false);
  let sortOption: keyof Property | null = $state(null);

  function handleSortPropertiesClick(newSortOption: keyof Property) {
    sortOption = newSortOption;
    sortedProperties = sortProperties($filteredProperties, sortOption); // TODO: Check why derived is not working, maybe it automatically gets fixed after refactoring other part of code
  }

  let sortedProperties = $derived(sortProperties($filteredProperties, sortOption));

  $effect(() => {
    removeUnfilteredPropertiesFromSelection($filteredProperties);
  });

  function removeUnfilteredPropertiesFromSelection(filteredProperties: Property[]) {
    const newSelectedPropertyIds = selectedPropertyIds.filter((id) => {
      return filteredProperties.some((property) => property.id === id);
    });

    // Check if actually changed
    if (newSelectedPropertyIds.length !== selectedPropertyIds.length) {
      selectedPropertyIds = newSelectedPropertyIds;
    }
  }

  // Property filtering

  // onMenuItemClick: (item: MenuItem) => void;
  function handleItemClick(item: MenuItem) {
    const buttonLabel = item.label;
    console.log(`${buttonLabel} label clicked in PropertyPage.`);

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
    propertyFormStore.resetForm();
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
      // propertyFormStore.setFieldValues(selectedProperty); TODO
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
  let selectedPropertyIds: string[] = $state([]);

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
      onMenuItemClick={handleItemClick}
      onSortClick={handleSortPropertiesClick}
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
