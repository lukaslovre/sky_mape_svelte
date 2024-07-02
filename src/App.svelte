<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import PropertyList from "./lib/PropertyList.svelte";
  import { properties } from "./assets/propertiesData";
  import {
    emptyFiltersObject,
    parseFilterValues,
    filterProperties,
  } from "./lib/utils/filter";
  import type { Filters, Property } from "./types";

  let filteredProperties: Property[] = properties;
  let filters: Filters = emptyFiltersObject();
  let favorites;

  let isDrawing: boolean = false;

  $: {
    // When filters change
    const parsedFilters = parseFilterValues(filters);
    filteredProperties = filterProperties(properties, parsedFilters);
  }

  function saveNewPolygon(event: CustomEvent) {
    filters.polygons = [...filters.polygons, event.detail];
  }
</script>

<main>
  <Header bind:filters bind:isDrawing />

  <div class="map-and-list-container">
    <Map
      {properties}
      {filteredProperties}
      {isDrawing}
      polygons={filters.polygons}
      on:saveNewPolygon={saveNewPolygon}
      on:setPolygons={(e) => (filters.polygons = e.detail)}
    />

    <PropertyList properties={filteredProperties} />
  </div>
</main>

<!-- 
- stisak na favorit dodaje ga u listu favorita
- finalni dizajn kartice
- finalni dizajn expanded kartice
- ispravna kalkulacije točke u polygonu
- spremanje informacija za korisnike
- custom dropdown za korisnike
- switchanje između korisnika
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
