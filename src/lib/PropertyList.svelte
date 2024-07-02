<script lang="ts">
  import type { Property } from "../types";
  import PropertyCard from "./PropertyCard.svelte";

  export let properties: Property[];
  export let favorites: string[];

  let focusedProperty = "";
</script>

<aside>
  <h2>Property List</h2>
  <ul>
    {#each properties as property (property.popupData.titleContent)}
      <li>
        <PropertyCard
          propertyData={property}
          isFocused={focusedProperty === property.popupData.titleContent}
          isFavorite={favorites.includes(property.id)}
          on:toggleFavorite
        />
      </li>
    {/each}
  </ul>
</aside>

<style>
  aside {
    flex-shrink: 0;
    z-index: 1;

    padding: 2rem 1rem;
    background-color: #f2f2f2;

    overflow-y: auto;
    height: 79vh;
  }

  h2 {
    margin-bottom: 2rem;
  }

  ul {
    list-style-type: none;
  }
</style>
