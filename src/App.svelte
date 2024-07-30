<script lang="ts">
  import type { Filters, Property, UserData } from "./types";
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  // import { properties } from "./assets/propertiesData";

  import Dialog from "./lib/Dialog.svelte";
  import PropertyCard from "./lib/Property/PropertyCard.svelte";
  import Table from "./lib/Table.svelte";

  import { activeTab, filteredProperties, filters, properties, users } from "./store";

  let favorites: Property["id"][] = [];
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

  function toggleFavorite(propertyId: Property["id"]) {
    if (favorites.includes(propertyId)) {
      favorites = favorites.filter((id) => id !== propertyId);
    } else {
      favorites = [...favorites, propertyId];
    }
  }

  type DialogType = "property" | "buyer";

  let openDialog: DialogType | null = null;
</script>

<Dialog
  title="Popis nekretnina"
  isOpen={openDialog === "property"}
  beforeClose={() => {
    openDialog = null;
  }}
>
  <div class="properties-inside-dialog-container">
    {#each $properties as property}
      <PropertyCard
        {property}
        isFavorite={favorites.includes(property.id)}
        {toggleFavorite}
      />
    {/each}
  </div>
</Dialog>

<Dialog
  title="Popis kupaca"
  isOpen={openDialog === "buyer"}
  beforeClose={() => {
    openDialog = null;
  }}
>
  <Table showHeader={true} headers={Object.keys($users[0] || {})} data={$users} />
</Dialog>

<main>
  <Header on:isDrawingChange={handleIsDrawingChange} />

  <div class="content">
    {#if $activeTab === "Map"}
      <Map {isDrawing} {favorites} bind:selectedPropertyId />
    {:else if $activeTab === "Properties"}
      <div class="properties-inside-dialog-container">
        {#each $filteredProperties as property (property.id)}
          <PropertyCard
            {property}
            isFavorite={favorites.includes(property.id)}
            {toggleFavorite}
          />
        {/each}
      </div>
    {:else if $activeTab === "Buyers"}
      <div class="buyers-container">
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
</style>
