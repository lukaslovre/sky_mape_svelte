<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import PropertyList from "./lib/PropertyList.svelte";
  import { properties } from "./assets/propertiesData";

  type Filters = {
    maxArea: number;
    minArea: number;
    maxPrice: number;
    minPrice: number;
    type: string[];
    action: string[];
  };

  let filteredProperties = properties;

  function handleFilterProperties(event: CustomEvent) {
    console.log(event.detail);

    const { maxArea, minArea, maxPrice, minPrice, type, action } =
      event.detail as Filters;

    filteredProperties = properties.filter((house) => {
      if (house.popupData.price < minPrice || house.popupData.price > maxPrice)
        return false;

      if (house.popupData.surfaceArea < minArea || house.popupData.surfaceArea > maxArea)
        return false;

      if (type.length > 0 && !type.includes(house.type)) return false;

      if (action.length > 0 && !action.includes(house.action)) return false;

      return true;
    });
  }

  let isDrawing: boolean = false;

  let focusedProperty = "";

  function setFocusedProperty(property) {
    focusedProperty = property;
  }
</script>

<main>
  <Header on:filterValuesChanged={handleFilterProperties} bind:isDrawing />

  <div class="map-and-list-container">
    <Map properties={filteredProperties} {isDrawing} {focusedProperty} />
    <PropertyList
      properties={filteredProperties}
      {focusedProperty}
      {setFocusedProperty}
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
