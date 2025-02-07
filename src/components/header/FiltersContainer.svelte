<script lang="ts">
  import MinMaxInput from "./MinMaxInput.svelte";
  import ResetIcon from "../../assets/icons/ResetIcon.svelte";
  import LocationInput from "./LocationInput.svelte";
  import { dataStore } from "../../stores/store.svelte";
  import Dropdown from "../common/Dropdown.svelte";
  import { filtersStore, type Filter } from "../../stores/filtersStore.svelte";
  import { parseValueWithSuffix } from "../../utils/numbers";
  import { uiStateStore } from "../../stores/uiStateStore.svelte";
  import {
    propertyActionDropdownOptions,
    propertyStatusDropdownOptions,
    propertyTypeDropdownOptions,
  } from "../../utils/properties";
  import FiltersBelongingToUser from "./FiltersBelongingToUser.svelte";

  $inspect(filtersStore.filters);

  let activeFiltersCount = $derived(
    Object.keys(filtersStore.removeEmptyFilterFields()).length
  );
  let activeFavoritesCount = $derived(dataStore.favoriteProperties.length);

  type InputType =
    | {
        type: "dropdown";
        label: string;
        id: keyof Filter;
        options: { label: string; value: string }[];
      }
    | {
        type: "min-max";
        label: string;
        idMax: keyof Filter;
        idMin: keyof Filter;
      }
    | {
        type: "divider";
      };

  function resetValues() {
    filtersStore.resetFilters();
  }

  function emptyFavoriteProperties() {
    dataStore.resetFavoriteProperties();
  }

  let agentsOptions: { label: string; value: string }[] = $derived(
    dataStore.agents.map((agent) => {
      return { label: agent.name, value: agent.id };
    })
  );

  let inputs: InputType[] = $derived([
    {
      type: "dropdown",
      label: "Tip nekretnine",
      id: "type",
      options: propertyTypeDropdownOptions,
    },
    {
      type: "dropdown",
      label: "Akcija",
      id: "action",
      options: propertyActionDropdownOptions,
    },
    {
      type: "min-max",
      label: "Cijena (€)",
      idMax: "maxPrice",
      idMin: "minPrice",
    },
    {
      type: "min-max",
      label: "Površina (m2)",
      idMax: "maxArea",
      idMin: "minArea",
    },
    {
      type: "divider",
    },
    {
      type: "dropdown",
      label: "Vidljivost",
      id: "visibility",
      options: [
        { label: "Javno", value: "Visible" },
        { label: "Off-market", value: "Hidden" },
      ],
    },
    {
      type: "dropdown",
      label: "Status",
      id: "status",
      options: propertyStatusDropdownOptions,
    },
    {
      type: "dropdown",
      label: "Agent",
      id: "agentIds",
      options: agentsOptions,
    },
  ]);
</script>

<div class="filters-container" class:highlight={uiStateStore.highlightFiltersContainer}>
  <FiltersBelongingToUser
    user={filtersStore.belongsToClientId
      ? dataStore.users.find((user) => user.id === filtersStore.belongsToClientId)
      : undefined}
  />

  <div class="buttons-container">
    <button
      type="reset"
      class="button"
      onclick={resetValues}
      disabled={activeFiltersCount === 0}
    >
      <ResetIcon /> Filtri ({activeFiltersCount})
    </button>
    <button
      type="reset"
      class="button"
      onclick={emptyFavoriteProperties}
      disabled={activeFavoritesCount === 0}
    >
      <ResetIcon /> Favoriti ({activeFavoritesCount})
    </button>
  </div>

  <div class="inputs-container">
    <LocationInput />
    {#each inputs as input}
      {#if input.type === "dropdown"}
        <Dropdown
          label={input.label}
          id={input.id}
          options={input.options}
          selectedValues={filtersStore.filters[input.id] as string[]}
          onValueChange={(newValues: string[]) => {
            filtersStore.setField(input.id, newValues);
          }}
          multipleValues={true}
        />
      {:else if input.type === "min-max"}
        <MinMaxInput
          label={input.label}
          id={input.idMin}
          minValue={filtersStore.filters[input.idMin] as any}
          onMinValueChange={(newValue) => {
            const transformed = parseValueWithSuffix(newValue);
            filtersStore.setField(input.idMin, transformed);
          }}
          maxValue={filtersStore.filters[input.idMax] as any}
          onMaxValueChange={(newValue) => {
            const transformed = parseValueWithSuffix(newValue);
            filtersStore.setField(input.idMax, transformed);
          }}
        />
      {:else if input.type === "divider"}
        <hr class="filtersDivider" />
      {/if}
    {/each}
  </div>
</div>

<style>
  .filters-container {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .filters-container.highlight {
    /* Add a flashing effect to attract attention */
    animation: highlight 1s infinite;
  }

  @keyframes highlight {
    0%,
    100% {
      background-color: transparent;
    }
    50% {
      background-color: hsl(60, 65%, 80%);
    }
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

  .button[disabled] {
    opacity: 0.25;
    cursor: not-allowed;
  }
</style>
