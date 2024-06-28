<script lang="ts">
  import PropertyCard from "./PropertyCard.svelte";

  export let properties;
  export let focusedProperty;
  export let setFocusedProperty;
</script>

<aside>
  <h2>Property List</h2>
  <ul>
    {#each properties as property (property.popupData.titleContent)}
      <li>
        <PropertyCard
          propertyData={property}
          isFocused={focusedProperty === property.popupData.titleContent}
          {setFocusedProperty}
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
