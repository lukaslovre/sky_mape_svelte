<script lang="ts">
  import MinMaxInput from "./MinMaxInput.svelte";
  import ResetIcon from "../../assets/icons/ResetIcon.svelte";
  import LocationInput from "./LocationInput.svelte";
  import { filters, agents, favoriteProperties } from "../../stores/store";
  import type { Filters } from "../../types";
  import { emptyFavorites, resetFilters } from "../../stores/actions";
  import { parseFilterValues, removeEmptyValuesFromFilters } from "../../utils/filter";
  import Dropdown from "../common/Dropdown.svelte";

  function resetValues() {
    resetFilters();
  }

  function emptyFavoriteProperties() {
    emptyFavorites();
  }

  let agentsOptions: { label: string; value: string }[] = [];

  $: if ($agents.length > 0) {
    agentsOptions = $agents.map((agent) => {
      return { label: agent.name, value: agent.id };
    });

    // Delete the current array element with id "agentIds"
    inputs = inputs.filter(
      (input) => input.type === "divider" || input.id !== "agentIds"
    );

    inputs = [
      ...inputs,
      {
        type: "dropdown",
        label: "Agent",
        id: "agentIds",
        options: agentsOptions,
        filtersBind: "agentIds",
      },
    ];
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
      }
    | {
        type: "divider";
      };

  let inputs: InputType[] = [
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
      type: "divider",
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
    {
      type: "dropdown",
      label: "Agent",
      id: "agentIds",
      options: agentsOptions,
      filtersBind: "agentIds",
    },
  ];
</script>

<div class="filters-container">
  <div class="inputs-container">
    <LocationInput />
    {#each inputs as input}
      {#if input.type === "dropdown"}
        <p>Wait...</p>
        <!-- <Dropdown
          label={input.label}
          id={input.id}
          options={input.options}
          bind:values={$filters[input.filtersBind]}
          multipleValues={true}
        /> -->
      {:else if input.type === "min-max"}
        <MinMaxInput
          label={input.label}
          id={input.id}
          bind:minValue={$filters[input.filtersBindMin]}
          bind:maxValue={$filters[input.filtersBindMax]}
        />
      {:else if input.type === "divider"}
        <hr class="filtersDivider" />
      {/if}
    {/each}
  </div>

  <div class="buttons-container">
    <button type="reset" class="button" on:click={resetValues}>
      <ResetIcon /> Filtri ({Object.keys(
        removeEmptyValuesFromFilters(parseFilterValues($filters))
      ).length})
    </button>
    <button type="reset" class="button" on:click={emptyFavoriteProperties}>
      <!-- add star emoji -->
      <ResetIcon /> Favoriti ({$favoriteProperties.length})
    </button>
  </div>
</div>

<style>
  .filters-container {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .inputs-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .buttons-container {
    display: flex;
    gap: 1rem;
  }

  hr.filtersDivider {
    border: 0;
    border-top: 1px solid #e0e0e0;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 2.5rem;
    width: 100%;
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
