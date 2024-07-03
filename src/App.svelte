<script lang="ts">
  import type { Filters, Property } from "./types";
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import PropertyList from "./lib/PropertyList.svelte";
  import { properties } from "./assets/propertiesData";
  import {
    emptyFiltersObject,
    parseFilterValues,
    filterProperties,
  } from "./lib/utils/filter";

  let filteredProperties: Property[] = properties;
  let filters: Filters = emptyFiltersObject();
  let favorites: string[] = [];

  let isDrawing: boolean = false;

  $: {
    // When filters change
    const parsedFilters = parseFilterValues(filters);
    filteredProperties = filterProperties(properties, parsedFilters);
  }

  function saveNewPolygon(event: CustomEvent) {
    filters.polygons = [...filters.polygons, event.detail];
  }

  function toggleFavorite(e: CustomEvent<string>) {
    const propertyId = e.detail;

    if (favorites.includes(propertyId)) {
      favorites = favorites.filter((id) => id !== propertyId);
    } else {
      favorites = [...favorites, propertyId];
    }
  }

  function applyUserDataToApp(e: CustomEvent) {
    const userData = e.detail;
    console.log(userData);
  }
</script>

<main>
  <Header bind:filters bind:isDrawing on:selectBuyer={applyUserDataToApp} />

  <div class="map-and-list-container">
    <Map
      {properties}
      {filteredProperties}
      {isDrawing}
      polygons={filters.polygons}
      on:saveNewPolygon={saveNewPolygon}
      on:setPolygons={(e) => (filters.polygons = e.detail)}
    />

    <PropertyList
      properties={filteredProperties}
      {favorites}
      on:toggleFavorite={toggleFavorite}
    />
  </div>
</main>

<!-- 
- finalni dizajn kartice
- finalni dizajn expanded kartice
- switchanje između korisnika
- spremanje informacija za korisnike
-->

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
