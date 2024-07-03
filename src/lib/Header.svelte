<script lang="ts">
  import type { Filters } from "../types";
  import BuyerInput from "./header/BuyerInput.svelte";
  import FiltersContainer from "./header/FiltersContainer.svelte";

  export let isDrawing: boolean;
  export let filters: Filters;
</script>

<header>
  <BuyerInput on:selectBuyer />

  <FiltersContainer bind:filters bind:isDrawing />
</header>

<style>
  header {
    z-index: 401;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    background-color: #f7f7f7;
    padding: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  }
</style>
