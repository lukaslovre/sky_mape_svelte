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
  import Dialog from "./lib/Dialog.svelte";
  import PropertyCard from "./lib/Property/PropertyCard.svelte";

  let properties: Property[] = [];
  let filteredProperties: Property[] = [];

  getProperties()
    .then((data) => {
      properties = data;
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

  // function toggleFavorite(e: CustomEvent<string>) {
  //   const propertyId = e.detail;

  //   if (favorites.includes(propertyId)) {
  //     favorites = favorites.filter((id) => id !== propertyId);
  //   } else {
  //     favorites = [...favorites, propertyId];
  //   }
  // }

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
</script>

<Dialog title="Popis nekretnina">
  {#each properties as property}
    <PropertyCard
      {property}
      isFavorite={favorites.includes(property.id)}
      {toggleFavorite}
    />
  {/each}
</Dialog>

<main>
  <Header bind:filters bind:isDrawing on:selectBuyer={applyUserDataToApp} />

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

    <PropertyList
      properties={filteredProperties}
      {favorites}
      on:toggleFavorite={toggleFavorite}
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
</style>
