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
  $: {
    console.log("Filters changed: ", filters);
    // When filters change
    const parsedFilters = parseFilterValues(filters);
    filteredProperties = filterProperties(properties, parsedFilters);
  }

  let isDrawing: boolean = false;

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
    />

    <PropertyList properties={filteredProperties} />
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
