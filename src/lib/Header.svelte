<script lang="ts">
  import SaveIcon from "../assets/icons/SaveIcon.svelte";
  import type { Filters } from "../types";
  import BuyerInput from "./header/BuyerInput.svelte";
  import FiltersContainer from "./header/FiltersContainer.svelte";

  export let isDrawing: boolean;
  export let filters: Filters;

  export let openDialog: string | null;
</script>

<header>
  <div>
    <div class="upper-row">
      <button
        on:click={() => {
          openDialog = "property";
        }}>Show properties</button
      >
      <button
        on:click={() => {
          openDialog = "buyer";
        }}>Show buyers</button
      >
    </div>

    <!-- <div class="top-row">
      <div>
        <BuyerInput on:selectBuyer />
        <button type="button" class="button"><SaveIcon />Save</button>
      </div>

      <div>
        <BuyerInput on:selectBuyer />
        <button type="button" class="button"><SaveIcon />Save</button>
      </div>
    </div> -->

    <FiltersContainer bind:filters bind:isDrawing />
  </div>
</header>

<style>
  header {
    z-index: 402;
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

  /* .top-row {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
  }
  .top-row > div {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
  } */

  .upper-row {
    display: flex;
    gap: 1rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 2.5rem;
    padding: 0 1rem;
    background-color: #0d65d9;
    border: 1px solid transparent;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      background-color 75ms ease-out,
      outline 75ms ease-out;
  }

  button:hover {
    background-color: #0b5eda;
  }
  button:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
