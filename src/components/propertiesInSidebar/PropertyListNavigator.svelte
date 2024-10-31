<script lang="ts">
  import { filteredProperties } from "../../stores/store";
  import ArrowButton from "./ArrowButton.svelte";

  $: filteredCount = $filteredProperties.length;
</script>

<div class="property-list-navigator">
  <ArrowButton direction="left" />
  <p>1/{filteredCount}</p>
  <ArrowButton direction="right" />
</div>

<style>
  .property-list-navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .property-list-navigator p {
    color: #1a1a1a;
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
