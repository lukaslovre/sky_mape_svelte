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

  let selectedPropertyId: Property["id"] | null = null;

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

<!-- 
- finalni dizajn expanded kartice
- switchanje između korisnika
- spremanje informacija za korisnike
- dodavanje nekretnina preko ui-a
- kad se klikne na lokaciju u listi, se pomakne na tu lokaciju na mapi
- 'only favorites' filter na list
- napraviti favorites verzije svih ikona
- sortiranje propertya u listi
- ispravno filtriranje akcija i tipova nekretnina
- klik na kontakt korisnika kopira u clipboard
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
