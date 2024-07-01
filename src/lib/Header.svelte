<script lang="ts">
  // import { createEventDispatcher } from "svelte";
  import BuyerInput from "./header/BuyerInput.svelte";
  import FiltersContainer from "./header/FiltersContainer.svelte";

  // const dispatch = createEventDispatcher();

  export let isDrawing: boolean;
</script>

<header>
  <BuyerInput />

  <FiltersContainer on:filterValuesChanged bind:isDrawing />
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
