<script lang="ts">
  import type { MenuItem, Property } from "../../types";
  import { dataStore } from "../../stores/store.svelte";
  import { sortProperties } from "../../utils/properties";
  import PropertyForm from "./PropertyForm/PropertyForm.svelte";
  import Header1 from "../common/Header1.svelte";
  import Table from "../tables/propertiesTable/Table.svelte";
  import PropertyMenubar from "./PropertyMenubar.svelte";
  import { propertyFormStore } from "../../stores/propertiesFormStore.svelte";
  import { deleteProperty } from "../../models/Properties";

  // Property sorting
  let showForm: boolean = $state(false);

  const sortOptions: (keyof Property)[] = [
    "created",
    "surfaceArea",
    "price",
    "bathrooms",
    "bedrooms",
  ];
  let sortOptionIndex: number = $state(0);

  function cycleSortOption() {
    sortOptionIndex = (sortOptionIndex + 1) % sortOptions.length;
  }

  let sortedProperties = $derived(
    sortProperties(dataStore.filteredProperties, sortOptions[sortOptionIndex])
  );

  $effect(() => {
    removeUnfilteredPropertiesFromSelection(dataStore.filteredProperties);
  });

  function removeUnfilteredPropertiesFromSelection(filteredProperties: Property[]) {
    // Remove properties that are no longer in the filteredProperties store
    const newSelectedPropertyIds = dataStore.selectedPropertyIds.filter((id) => {
      return filteredProperties.some((property) => property.id === id);
    });

    // Check if actually changed
    if (newSelectedPropertyIds.length !== dataStore.selectedPropertyIds.length) {
      dataStore.selectedPropertyIds = newSelectedPropertyIds;
    }
  }

  // Property filtering

  function handleMenuItemClick(item: MenuItem) {
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
    if (dataStore.selectedPropertyIds.length !== 1) return;

    const selectedProperty = findSelectedProperty(dataStore.selectedPropertyIds[0]);

    if (selectedProperty) {
      // propertyFormStore.setFieldValues(selectedProperty); TODO
      showForm = true;
    }
  }

  // Deletes selected properties
  function handleDelete() {
    if (dataStore.selectedPropertyIds.length === 0) return;

    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${dataStore.selectedPropertyIds.length} selected properties?`
    );
    if (!confirmDeletion) return;

    const promises = dataStore.selectedPropertyIds.map((id) => deleteProperty(id));

    Promise.all(promises)
      .then(() => {
        alert("Sve nekretnine uspješno obrisane!");
      })
      .catch((err) => {
        console.error("Error deleting properties:", err);
        alert("Barem jedna nekretnina nije uspješno obrisana.");
      });
  }

  // Util
  function findSelectedProperty(id: string) {
    return dataStore.filteredProperties.find((property) => property.id === id);
  }

  // Table specific

  function handleCheckboxClick(propertyId: Property["id"], newState: boolean): void {
    // True = ON, False = OFF
    if (newState) {
      if (!dataStore.selectedPropertyIds.includes(propertyId)) {
        dataStore.selectedPropertyIds.push(propertyId);
      }
    } else {
      dataStore.selectedPropertyIds = dataStore.selectedPropertyIds.filter(
        (id) => id !== propertyId
      );
    }
  }
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  {#if !showForm}
    <PropertyMenubar
      selectedPropertiesLength={dataStore.selectedPropertyIds.length}
      onMenuItemClick={handleMenuItemClick}
      {cycleSortOption}
      currentSortOptionLabel={sortOptions[sortOptionIndex] as string}
    />

    <Table
      showHeader={true}
      data={sortedProperties}
      {handleCheckboxClick}
      selectedPropertyIds={dataStore.selectedPropertyIds}
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
