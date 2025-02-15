<script lang="ts">
  import { dataStore } from "../../lib/stores/store.svelte";
  import PropertyRow from "../properties/propertyRow/PropertyRow.svelte";
</script>

<div class="container">
  <div class="label-container">
    <p>Favorited nekretnine</p>
    <!-- <span class="icon">?</span> -->
  </div>
  <div class="values-container">
    {#each dataStore.getPropertiesByIds(dataStore.favoriteProperties) as property (property.id)}
      <PropertyRow {property} />
    {/each}
  </div>
</div>

<style>
  .container {
    width: 100%;

    border: 1px solid hsl(0, 0%, 50%);
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: hsl(0, 0%, 90%);
  }

  .label-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .label-container p {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .label-container .icon {
    display: flex;
    justify-content: center;
    align-items: center;

    color: hsl(0, 0%, 25%);
    font-size: 0.75rem;
    font-weight: 600;

    border: 1px solid hsl(0, 0%, 50%);
    border-radius: 9999px;
    width: 1.25rem;
    height: 1.25rem;

    cursor: pointer;
    transition:
      background-color 75ms ease-out,
      color 75ms ease-out;
  }
  .label-container .icon:hover {
    background-color: hsl(0, 0%, 25%);
    color: hsl(0, 0%, 90%);
  }

  .values-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
