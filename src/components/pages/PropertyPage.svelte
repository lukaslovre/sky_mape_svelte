<script lang="ts">
  import type { MenuItem, Property } from "../../types";
  import { dataStore } from "../../lib/stores/store.svelte";
  import PropertyForm from "../properties/PropertyForm/PropertyForm.svelte";
  import Header1 from "../common/Header1.svelte";
  import PropertyMenubar from "../properties/PropertyMenubar.svelte";
  import { propertyFormStore } from "../../lib/stores/propertiesFormStore.svelte";
  import { deleteProperty } from "../../lib/models/Properties";
  import PropertiesTable from "../tables/PropertiesTable.svelte";
  import { uiStateStore } from "../../lib/stores/uiStateStore.svelte";
  import { filtersStore } from "../../lib/stores/filtersStore.svelte";

  // Property sorting
  const sortOptions: (keyof Property)[] = [
    "updated",
    "surfaceArea",
    "price",
    "bathrooms",
    "bedrooms",
  ];
  let sortOptionIndex: number = $derived(sortOptions.indexOf(dataStore.propertySortKey));

  function cycleSortOption() {
    dataStore.propertySortKey = sortOptions[(sortOptionIndex + 1) % sortOptions.length];
  }

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
      dataStore.setSelectedPropertyIds(newSelectedPropertyIds);
      // dataStore.selectedPropertyIds = newSelectedPropertyIds;
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

      case "Favoritiziraj":
        handleFavorite();
        break;

      default:
        console.log("Unknown button pressed in the PropertyPage menubar");
    }
  }

  // Shows the form for adding a new property
  function handleAdd() {
    const propertyIdField = propertyFormStore.getFieldByDatabaseFieldName("id")?.value;
    const propertyAgentField =
      propertyFormStore.getFieldByDatabaseFieldName("agent_id")?.value;

    if (propertyIdField !== "" && propertyIdField !== undefined) {
      // If id field is not empty, reset the form
      propertyFormStore.resetForm();
    } else if (
      !propertyAgentField ||
      (Array.isArray(propertyAgentField) && propertyAgentField.length === 0)
    ) {
      // If agent field is empty, reset the form
      propertyFormStore.resetForm();
    }

    uiStateStore.propertyFormVisible = true;
  }

  // Alerts that saving as table is not implemented
  function handleSaveAsTable() {
    alert(`"Spremi kao tablicu" još nije implementirano.`);
  }

  // Handles editing of a selected property
  function handleEdit() {
    const selectedProperty = findSelectedProperty(dataStore.selectedPropertyIds[0]);

    if (selectedProperty) {
      propertyFormStore.resetForm();
      propertyFormStore.setFieldValuesFromPropertyObject(selectedProperty);
      uiStateStore.propertyFormVisible = true;
    }
  }

  // Deletes selected properties
  function handleDelete() {
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

  function handleFavorite() {
    // For each selected property go over and add to favoriteProperties
    // Check if at least 1 property is not already in favoriteProperties -> in that case all are added
    // If all are already in favoriteProperties -> remove all from favoriteProperties

    const newState: boolean = dataStore.selectedPropertyIds.some(
      (id) => !filtersStore.isFavoriteProperty(id)
    );

    if (newState) {
      dataStore.selectedPropertyIds.forEach((id) => {
        filtersStore.addFavoriteProperty(id);
      });
    } else {
      dataStore.selectedPropertyIds.forEach((id) => {
        filtersStore.removeFavoriteProperty(id); // Changed to use the correct method for removing
      });
    }
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
        dataStore.setSelectedPropertyIds([...dataStore.selectedPropertyIds, propertyId]);
      }
    } else {
      dataStore.setSelectedPropertyIds(
        dataStore.selectedPropertyIds.filter((id) => id !== propertyId)
      );
    }
  }
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  {#if !uiStateStore.propertyFormVisible}
    <PropertyMenubar
      selectedPropertiesLength={dataStore.selectedPropertyIds.length}
      onMenuItemClick={handleMenuItemClick}
      {cycleSortOption}
      currentSortOptionLabel={sortOptions[sortOptionIndex] as string}
    />

    <!-- TODO: mozda napravit generalnu table komponentu koja prima selectedFieldIds -->
    <PropertiesTable
      showHeader={true}
      data={dataStore.filteredProperties}
      {handleCheckboxClick}
      selectedPropertyIds={dataStore.selectedPropertyIds}
      sortOptionField={sortOptions[sortOptionIndex]}
    />
  {:else}
    <PropertyForm
      close={() => {
        uiStateStore.propertyFormVisible = false;
        propertyFormStore.resetForm();
      }}
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
