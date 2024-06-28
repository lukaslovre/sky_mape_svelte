<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import PropertyList from "./lib/PropertyList.svelte";

  import { properties } from "./assets/propertiesData";

  let filteredProperties = properties;

  function handleFilterProperties(event) {
    console.log(event.detail);

    const { sizeMin, sizeMax, priceMin, priceMax, type, action } = event.detail;

    filteredProperties = properties.filter((house) => {
      if (house.popupData.price < priceMin || house.popupData.price > priceMax)
        return false;

      if (house.popupData.surfaceArea < sizeMin || house.popupData.surfaceArea > sizeMax)
        return false;

      if (type && house.type !== type) return false;

      if (action && house.action !== action) return false;

      return true;
    });
  }

  let isDrawing = false;
  let focusedProperty = "";

  function handleDrawButtonClick() {
    isDrawing = !isDrawing;
  }

  function setFocusedProperty(property) {
    focusedProperty = property;
  }
</script>

<main>
  <Header
    on:filterProperties={handleFilterProperties}
    {handleDrawButtonClick}
    {isDrawing}
  />

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
