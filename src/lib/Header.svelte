<script lang="ts">
  import type { Filters } from "../types";
  import BuyerInput from "./header/BuyerInput.svelte";
  import FiltersContainer from "./header/FiltersContainer.svelte";

  export let isDrawing: boolean;
  export let filters: Filters;
</script>

<header>
  <div>
    <BuyerInput on:selectBuyer />

    <FiltersContainer bind:filters bind:isDrawing />
  </div>
</header>

<style>
  header {
    z-index: 401;
    flex-shrink: 0;

    display: flex;
    justify-content: center;

    background-color: #f7f7f7;
    padding: 1.5rem 2rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  }

  header > div {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    max-width: 80rem;
  }
</style>
