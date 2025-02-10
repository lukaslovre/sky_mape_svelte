<script lang="ts">
  import type { FilterDifferences } from "../../stores/filtersStore.svelte";

  interface Props {
    filterDiffs: FilterDifferences | undefined | null;
  }

  let { filterDiffs }: Props = $props();

  //   TODO: parse the filter keys and values to match the rest of app, add diff to the client form, incorporate favoriteProperties
</script>

<div class="filter-diffs-container">
  {#if filterDiffs}
    {#each Object.entries(filterDiffs) as [key, value]}
      <div class="filter-diff-row">
        <p>{key}:</p>

        {#if value.removed.length > 0}
          {#if key === "polygons"}
            <p class="removed">{value.removed.length} removed</p>
          {:else}
            <p class="removed">{value.removed.join(", ")}</p>
          {/if}
        {/if}

        {#if value.added.length > 0}
          {#if key === "polygons"}
            <p class="added">{value.added.length} new</p>
          {:else}
            <p class="added">{value.added.join(", ")}</p>
          {/if}
        {/if}
      </div>
    {/each}
  {:else}
    <p>Nema razlike u filterima</p>
  {/if}
</div>

<style>
  .filter-diffs-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-diff-row {
    display: flex;
    gap: 1rem;
  }

  .filter-diff-row .removed {
    color: #e02424;
    text-decoration: line-through;
  }
  .filter-diff-row .added {
    color: #057a55;
  }
</style>
