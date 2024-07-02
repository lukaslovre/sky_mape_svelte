<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import PropertyList from "./lib/PropertyList.svelte";
  import { properties } from "./assets/propertiesData";

  let filteredProperties: Property[] = properties;
  let filters: Filters = emptyFilters();
  $: {
    // When filters change
    const parsedFilters = parseFilterValues(filters);
    handleFilterProperties(parsedFilters);
  }

  let polygons: [number, number][][] = [];

  let isDrawing: boolean = false;

  // This function is called when the filter values are changed in the Header component.
  // It receives the event object as an argument and extracts the detail property from it.
  // The detail property contains the values of the filters that were changed.
  // The function then deconstructs the detail object into the maxArea, minArea, maxPrice, minPrice, type, and action variables.
  // It then filters the properties array based on the filter values provided.
  // The filtered properties are stored in the filteredProperties variable.
  function handleFilterProperties({
    action,
    type,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
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
    };
  }
  function emptyFilters(): Filters {
    return {
      action: [],
      type: [],
      minPrice: 0,
      maxPrice: 0,
      minArea: 0,
      maxArea: 0,
    };
  }

  function saveNewPolygon(event: CustomEvent) {
    polygons = [...polygons, event.detail];
  }

  function latLngIsInPolygon(latLng: number[], polygon: [number, number][]): boolean {
    const x = latLng[0];
    const y = latLng[1];

    const maxY = Math.max(...polygon.map((point) => point[0]));
    const minY = Math.min(...polygon.map((point) => point[0]));
    const maxX = Math.max(...polygon.map((point) => point[1]));
    const minX = Math.min(...polygon.map((point) => point[1]));

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
      {polygons}
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
