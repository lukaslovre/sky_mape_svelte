<script lang="ts">
  import type { Filters, Property, UserData } from "./types";
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import PropertyList from "./lib/PropertyList.svelte";
  // import { properties } from "./assets/propertiesData";
  import {
    emptyFiltersObject,
    parseFilterValues,
    filterProperties,
  } from "./utils/filter";
  import { getProperties } from "./db/Properties";
  import { getUsers } from "./db/Clients";
  import Dialog from "./lib/Dialog.svelte";
  import PropertyCard from "./lib/Property/PropertyCard.svelte";
  import Table from "./lib/Table.svelte";

  let properties: Property[] = [];
  let filteredProperties: Property[] = [];

  getProperties()
    .then((data) => {
      properties = data;
    })
    .catch((error) => {
      console.error(error);
    });

  let users: UserData[] = [];

  getUsers()
    .then((data) => {
      users = data;
    })
    .catch((error) => {
      console.error(error);
    });

  let filters: Filters = emptyFiltersObject();
  let favorites: Property["id"][] = [];
  let isDrawing: boolean = false;
  let selectedPropertyId: Property["id"] | null = null;

  $: {
    // When filters change
    const parsedFilters = parseFilterValues(filters);
    filteredProperties = filterProperties(properties, parsedFilters);
  }

  function saveNewPolygon(event: CustomEvent) {
    filters.polygons = [...filters.polygons, event.detail];
  }

  function applyUserDataToApp(e: CustomEvent<UserData>) {
    const userData = e.detail;
    console.log(userData);

    if (userData.filters) {
      filters = {
        ...userData.filters,
      };
    }

    favorites = userData.favoriteProperties;
  }

  // new function
  function toggleFavorite(propertyId: Property["id"]) {
    if (favorites.includes(propertyId)) {
      favorites = favorites.filter((id) => id !== propertyId);
    } else {
      favorites = [...favorites, propertyId];
    }
  }

  type DialogType = "property" | "buyer";

  let openDialog: DialogType | null = "buyer";
</script>

<Dialog
  title="Popis nekretnina"
  isOpen={openDialog === "property"}
  beforeClose={() => {
    openDialog = null;
  }}
>
  <div class="properties-inside-dialog-container">
    {#each properties as property}
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
  <Table showHeader={true} headers={Object.keys(users[0] || {})} data={users} />
</Dialog>

<main>
  <Header
    bind:openDialog
    bind:filters
    bind:isDrawing
    on:selectBuyer={applyUserDataToApp}
  />

  <button
    type="button"
    on:click={() => {
      console.log("open dialog");
      openDialog = "property";
    }}>Open properties</button
  >
  <button
    type="button"
    on:click={() => {
      console.log("open dialog");
      openDialog = "buyer";
    }}>Open buyers</button
  >

  <div class="map-and-list-container">
    <Map
      {properties}
      {filteredProperties}
      {isDrawing}
      {favorites}
      polygons={filters.polygons}
      on:saveNewPolygon={saveNewPolygon}
      on:setPolygons={(e) => (filters.polygons = e.detail)}
      bind:selectedPropertyId
    />
  </div>
</main>

<style>
  main {
    height: 100vh;

    display: flex;
    flex-direction: column;
  }

  .map-and-list-container {
    flex: 1;

    display: flex;
    height: 100%;
  }

  .properties-inside-dialog-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 2rem;
  }

  /* .buyers-inside-dialog-container {

  } */
</style>
