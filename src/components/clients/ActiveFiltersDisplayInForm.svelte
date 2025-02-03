<script lang="ts">
  import { filtersStore } from "../../stores/filtersStore.svelte";
  import { uiStateStore } from "../../stores/uiStateStore.svelte";
  import { formatWithCommas } from "../../utils/numbers";
  import ActivePolygonsReadonlyMap from "../common/ActivePolygonsReadonlyMap.svelte";

  let filters = $derived(filtersStore.filters);

  let parsedValues: Record<string, string> = $derived({
    Cijena:
      !filters.minPrice && !filters.maxPrice
        ? "Any"
        : `${filters.minPrice ? formatWithCommas(filters.minPrice) : "0"} - ${filters.maxPrice ? formatWithCommas(filters.maxPrice) : "Infinity"} €`,

    Površina:
      !filters.minArea && !filters.maxArea
        ? "Any"
        : `${filters.minArea ? formatWithCommas(filters.minArea) : "0"} - ${filters.maxArea ? formatWithCommas(filters.maxArea) : "Infinity"} m²`,
    "Vrsta nekretnine": filters.type.join(" ili ") || "Any",
    Akcija: filters.action.join(" ili ") || "Any",
    Vidljivost: filters.visibility.join(" ili ") || "Any",
    Status: filters.status.join(" ili ") || "Any",
    Agent: filters.agentIds.join(" ili ") || "Any",
    "Broj poligona": filters.polygons.length ? filters.polygons.length.toString() : "Any",
  });

  function handleQuestionmarkHover() {
    uiStateStore.highlightFiltersContainer = true;
  }
  function handleQuestionmarkStopHover() {
    uiStateStore.highlightFiltersContainer = false;
  }
</script>

<div class="container">
  <div class="label-container">
    <p>Filteri</p>

    <div
      class="hover-container"
      onmouseover={() => handleQuestionmarkHover()}
      onmouseleave={() => handleQuestionmarkStopHover()}
    >
      <span class="icon">?</span>

      <!-- Hover info -->
      <div class="hover-text">
        Filteri za korisnika se biraju u lijevom, globalnom stupcu
      </div>
    </div>
  </div>
  <div class="values-container">
    {#each Object.entries(parsedValues) as [key, value]}
      <div class="value-row">
        <p class="key">{key}</p>
        <p class="value" class:empty={value === "Any"}>{value}</p>
      </div>
    {/each}

    <div class="polygon-map-container">
      <ActivePolygonsReadonlyMap />
    </div>
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
  }
  .label-container p {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .hover-container {
    position: relative;
  }

  .hover-container:hover .hover-text {
    display: block;
  }

  .hover-text {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    background-color: hsla(0, 0%, 0%, 0.9);
    color: hsl(0, 0%, 90%);
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    line-height: 140%;
    min-width: 10rem;
    max-width: 100%;
    display: none;
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

  .value-row {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: 0.875rem;
  }
  .value-row .key {
    color: hsl(0, 0%, 40%);
  }
  .value-row .value {
    color: hsl(0, 0%, 25%);
    font-weight: 500;
  }
  .value-row .value.empty {
    color: hsl(0, 0%, 66%);
  }

  .polygon-map-container {
    margin-top: 1rem;
    width: 100%;
    height: 10rem;
    border: 1px solid hsl(0, 0%, 75%);
  }
</style>
