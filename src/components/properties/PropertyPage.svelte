<script lang="ts">
  import type { MenuItem, Property } from "../../types";
  import PropertyCard from "./PropertyCard.svelte";
  import { filteredProperties } from "../../stores/store";
  import { sortProperties } from "../../utils/properties";
  import PropertyForm from "./PropertyForm/PropertyForm.svelte";
  import Header1 from "../common/Header1.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SortIcon from "../../assets/icons/SortIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import Menubar from "../common/Menubar.svelte";
  import Table from "../tables/propertiesTable/Table.svelte";

  // Property sorting

  const sortOptions: (keyof Property)[] = ["surfaceArea", "price", "created"];
  let selectedSortOptionIndex: number = 0;

  let menubarItems: MenuItem[] = [
    { label: "Dodaj", icon: SaveIcon, disabled: false },
    { label: "Sortiraj", icon: SortIcon, disabled: false },
    { label: "Spremi kao tablicu", icon: SpreadsheetIcon, disabled: false },
  ];

  function changeSortOption() {
    selectedSortOptionIndex = (selectedSortOptionIndex + 1) % sortOptions.length;
    console.log(`New sort option: ${sortOptions[selectedSortOptionIndex]}`);
  }

  $: updateSortLabel(selectedSortOptionIndex);

  function updateSortLabel(index: number) {
    menubarItems = menubarItems.map((item) => {
      if (item.label.startsWith("Sortiraj")) {
        item.label = `Sortiraj (${sortOptions[index]})`;
      }
      return item;
    });
  }

  // Property filtering
  let showForm = false;

  function handleItemClick(event: CustomEvent<MenuItem>) {
    const buttonLabel = event.detail.label;

    console.log(`${buttonLabel} label clicked.`);

    if (buttonLabel === "Dodaj") {
      showForm = true;
    } else if (buttonLabel.startsWith("Sortiraj")) {
      changeSortOption();
      // setSortOption(event.detail.label);
    } else if (buttonLabel === "Spremi kao tablicu") {
      console.log("Spremi kao tablicu");
    }
  }

  // Table specific
  let selectedPropertyIds: string[] = [];

  function handleCheckboxChange(event: CustomEvent<string[]>) {
    console.log(event.detail);
  }
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  {#if !showForm}
    <Menubar items={menubarItems} on:itemClick={handleItemClick} />
  {/if}

  {#if showForm}
    <PropertyForm close={() => (showForm = false)} />
  {:else}
    <Table
      showHeader={true}
      data={$filteredProperties}
      on:checkboxesChanged={handleCheckboxChange}
    />

    <!-- <div class="properties-grid-container">
      {#each sortProperties($filteredProperties, sortOptions[selectedSortOptionIndex]) as property (property.id)}
        <PropertyCard {property} on:openSideNote />
      {/each}
    </div> -->
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
