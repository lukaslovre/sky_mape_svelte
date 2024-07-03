<script lang="ts">
  import type { Property } from "../types";
  import PropertyCard from "./PropertyCard.svelte";

  export let properties: Property[];
  export let favorites: string[];

  export let selectedPropertyId: Property["id"] | null;

  $: if (selectedPropertyId) {
    const selectedProperty = document.getElementById(`property-li-${selectedPropertyId}`);
    selectedProperty?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<aside>
  <h2>Property List</h2>
  <ul>
    {#each properties as property (property.id)}
      <li id={`property-li-${property.id}`}>
        <PropertyCard
          propertyData={property}
          isFocused={selectedPropertyId === property.id}
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
