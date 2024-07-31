<script lang="ts">
  import type { Filters, Property, UserData } from "./types";
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  // import { properties } from "./assets/propertiesData";

  import Dialog from "./lib/Dialog.svelte";
  import PropertyCard from "./lib/Property/PropertyCard.svelte";
  import Table from "./lib/Table.svelte";

  import {
    activeTab,
    filteredProperties,
    filters,
    properties,
    users,
    favoriteProperties,
  } from "./store";
  import BuyerForm from "./lib/Buyer/BuyerForm.svelte";

  let isDrawing: boolean = false;
  let selectedPropertyId: Property["id"] | null = null;

  function handleIsDrawingChange(e: CustomEvent<boolean>) {
    isDrawing = e.detail;
  }

  function applyUserDataToApp(e: CustomEvent<UserData>) {
    const userData = e.detail;
    console.log(userData);

    if (userData.filters) {
      filters.set(userData.filters); // ovdje treba vidjet da uvijek vraća objekt
    }

    favorites = userData.favoriteProperties;
  }

  type DialogType = "saveBuyer";

  let openDialog: DialogType | null = null;
</script>

<Dialog
  title="Spremi novog kupca"
  isOpen={openDialog === "saveBuyer"}
  beforeClose={() => {
    openDialog = null;
  }}
>
  <BuyerForm />
</Dialog>

<main>
  <Header on:isDrawingChange={handleIsDrawingChange} />

  <div class="content">
    {#if $activeTab === "Map"}
      <Map {isDrawing} bind:selectedPropertyId />
    {:else if $activeTab === "Properties"}
      <div class="properties-inside-dialog-container">
        {#each $filteredProperties as property (property.id)}
          <PropertyCard {property} />
        {/each}
      </div>
    {:else if $activeTab === "Buyers"}
      <div class="buyers-container">
        <h2>Popis kupaca</h2>

        <button
          on:click={() => {
            openDialog = "saveBuyer";
          }}>Spremi novog kupca</button
        >

        <Table showHeader={true} headers={Object.keys($users[0] || {})} data={$users} />
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    height: 100vh;

    display: flex;
    flex-direction: column;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;

    margin-bottom: 1.5rem;
  }

  .content {
    height: 100%;
    width: 100%;
  }

  .properties-inside-dialog-container {
    padding: 2.5rem;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }

  .buyers-container {
    padding: 2.5rem;
  }
  .buyers-container button {
    margin-bottom: 1.5rem;

    padding: 0.5rem 1rem;
    background-color: hsl(0, 0%, 80%);
    border-radius: 0.25rem;
  }
</style>
