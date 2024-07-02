<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import PropertyList from "./lib/PropertyList.svelte";
  import { properties } from "./assets/propertiesData";
  import { emptyFiltersObject } from "./lib/utils/filter";
  import type { Filters, Property } from "./types";
  import type { LatLng } from "leaflet";

  let filteredProperties: Property[] = properties;
  let filters: Filters = emptyFiltersObject();
  $: {
    console.log("Filters changed: ", filters);
    // When filters change
    const parsedFilters = parseFilterValues(filters);
    handleFilterProperties(parsedFilters);
  }

  let isDrawing: boolean = false;

  function handleFilterProperties({
    action,
    type,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    polygons,
  }: Filters) {
    filteredProperties = properties.filter((house) => {
      if (house.popupData.price < minPrice || house.popupData.price > maxPrice)
        return false;

      if (house.popupData.surfaceArea < minArea || house.popupData.surfaceArea > maxArea)
        return false;

      if (type.length > 0 && !type.includes(house.type)) return false;

      if (action.length > 0 && !action.includes(house.action)) return false;

      if (
        polygons.length > 0 &&
        polygons.every((polygon) => !latLngIsInPolygon(house.latlng, polygon))
      )
        return false;

      return true;
    });
  }
  function parseFilterValues({
    action,
    type,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
  }: Filters): Filters {
    return {
      action: action || [],
      type: type || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || Infinity,
      minArea: minArea || 0,
      maxArea: maxArea || Infinity,
      polygons: filters.polygons || [],
    };
  }

  function saveNewPolygon(event: CustomEvent) {
    filters.polygons = [...filters.polygons, event.detail];
  }
  function latLngIsInPolygon(latLng: LatLng, polygon: LatLng[]): boolean {
    const x = latLng.lat;
    const y = latLng.lng;

    const maxY = Math.max(...polygon.map((point) => point.lat));
    const minY = Math.min(...polygon.map((point) => point.lat));
    const maxX = Math.max(...polygon.map((point) => point.lng));
    const minX = Math.min(...polygon.map((point) => point.lng));

    if (x < minY || x > maxY || y < minX || y > maxX) return false;

    return true;
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
