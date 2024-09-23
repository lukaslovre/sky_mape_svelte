<script lang="ts">
  import DropdownInput from "./DropdownInput.svelte";
  import MinMaxInput from "./MinMaxInput.svelte";
  import ResetIcon from "../../assets/icons/ResetIcon.svelte";
  import LocationInput from "./LocationInput.svelte";
  import { filters } from "../../stores/store";
  import type { Filters } from "../../types";
  import { emptyFavorites, resetFilters } from "../../stores/actions";

  function resetValues() {
    resetFilters();
  }

  function emptyFavoriteProperties() {
    emptyFavorites();
  }

  type InputType =
    | {
        type: "dropdown";
        label: string;
        id: string;
        filtersBind: keyof Filters;
        options: { label: string; value: string }[];
      }
    | {
        type: "min-max";
        label: string;
        id: string;
        filtersBindMin: keyof Filters;
        filtersBindMax: keyof Filters;
      };

  const inputs: InputType[] = [
    {
      type: "dropdown",
      label: "Tip nekretnine",
      id: "type",
      options: [
        { label: "Stan", value: "Apartment" },
        { label: "Kuća", value: "House" },
        { label: "Poslovni prostor", value: "Commercial" },
        { label: "Zemljište", value: "Land" },
      ],
      filtersBind: "type",
    },
    {
      type: "dropdown",
      label: "Akcija",
      id: "action",
      options: [
        { label: "Prodaja", value: "Sale" },
        { label: "Najam", value: "Rent" },
      ],
      filtersBind: "action",
    },
    {
      type: "min-max",
      label: "Cijena (€)",
      id: "price",
      filtersBindMin: "minPrice",
      filtersBindMax: "maxPrice",
    },
    {
      type: "min-max",
      label: "Površina (m2)",
      id: "area",
      filtersBindMin: "minArea",
      filtersBindMax: "maxArea",
    },
    {
      type: "dropdown",
      label: "Vidljivost",
      id: "visibility",
      options: [
        { label: "Vidljivo", value: "Visible" },
        { label: "Sakriveno", value: "Hidden" },
      ],
      filtersBind: "visibility",
    },
    {
      type: "dropdown",
      label: "Status",
      id: "status",
      options: [
        { label: "Dostupno", value: "available" },
        {
          label: "U obradi",
          value: "processing",
        },
        { label: "Prodano", value: "sold" },
      ],
      filtersBind: "status",
    },
  ];
</script>

<div class="filters-container">
  <div class="inputs-container">
    {#each inputs as input}
      {#if input.type === "dropdown"}
        <DropdownInput
          label={input.label}
          id={input.id}
          options={input.options}
          bind:values={$filters[input.filtersBind]}
        />
      {:else if input.type === "min-max"}
        <MinMaxInput
          label={input.label}
          id={input.id}
          bind:minValue={$filters[input.filtersBindMin]}
          bind:maxValue={$filters[input.filtersBindMax]}
        />
      {/if}
    {/each}

    <LocationInput on:isDrawingChange />
  </div>

  <div class="buttons-container">
    <button type="reset" class="button" on:click={resetValues}>
      <ResetIcon /> Filtri i lokacija
    </button>
    <button type="reset" class="button" on:click={emptyFavoriteProperties}>
      <!-- add star emoji -->
      <ResetIcon /> Favoriti 🌟
    </button>
  </div>
</div>

<style>
  .filters-container {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e6e6e6;

    width: 100%;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
  }
  .inputs-container {
    flex: 1;

    display: flex;
    align-items: flex-end;
    gap: 1rem;
  }
  .buttons-container {
    display: flex;
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
