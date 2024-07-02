<script lang="ts">
  import DropdownInput from "./DropdownInput.svelte";
  import MinMaxInput from "./MinMaxInput.svelte";
  import ResetIcon from "../../assets/icons/ResetIcon.svelte";
  import LocationInput from "./LocationInput.svelte";

  export let isDrawing: boolean;
  export let filters: Filters;

  function resetValues() {
    filters = {
      action: [],
      type: [],
      minPrice: 0,
      maxPrice: 0,
      minArea: 0,
      maxArea: 0,
    };
  }
</script>

<div class="filters-container">
  <DropdownInput
    label="Akcija"
    id="action"
    options={["Prodaja", "Izdavanje"]}
    bind:values={filters.action}
  />

  <DropdownInput
    label="Tip nekretnine"
    id="type"
    options={["Stan", "Kuća", "Poslovni prostor", "Zemljište"]}
    bind:values={filters.type}
  />

  <MinMaxInput
    label="Cijena (€)"
    id="price"
    bind:minValue={filters.minPrice}
    bind:maxValue={filters.maxPrice}
  />

  <MinMaxInput
    label="Površina (m2)"
    id="area"
    bind:minValue={filters.minArea}
    bind:maxValue={filters.maxArea}
  />

  <LocationInput bind:isDrawing />

  <button type="reset" class="button" style="margin-left: 2.5rem;" on:click={resetValues}>
    <ResetIcon /> Resetiraj
  </button>
</div>

<style>
  .filters-container {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
  }

  .button {
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

  .button:hover {
    background-color: #0b5eda;
  }
  .button:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
