<script lang="ts">
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import XIcon from "../../assets/icons/xIcon.svelte";
  import { filtersStore } from "../../stores/filtersStore.svelte";
  import { uiStateStore } from "../../stores/uiStateStore.svelte";
  import type { Client } from "../../types";
  import FilterDiffs from "./FilterDiffs.svelte";

  interface Props {
    user: Client | undefined;
  }

  let { user }: Props = $props();

  function handleAddUserClick() {
    uiStateStore.activeTab = "Buyers";
    uiStateStore.clientFormVisible = true;
  }

  function handleXClick() {
    filtersStore.belongsToClientId = undefined;
  }

  let filterDiferences = $derived(
    user?.filters && filtersStore.getFilterDifferences(user.filters, filtersStore.filters)
  );
  $inspect(filterDiferences);

  let noDifference = $derived(
    !filterDiferences || Object.keys(filterDiferences).length === 0
  );

  function handleUpdateFiltersClick() {}
</script>

<!-- 
SPECIFICATION:
- This component should display the name of the user whose filters are currently applied.
- If no user is selected, it should display a button to add a new user with the currently selected filters.
- If a user is selected, it should display the name of the user and a button to remove the selected user.
- If the filters change from the ones belonging to selected user, have some visual feedback and give the user an option to save (update) the new filters to the selected user.
- If the user container is clicked, it goes to the ClientForm.
-->
{#if user}
  <div class="filters-belonging-to-user-container">
    <img src={"profile.png"} alt="pfp" />
    <p>{user.name}</p>
    <div class="action-buttons-container">
      <button
        id="update-filters-button"
        onclick={handleUpdateFiltersClick}
        disabled={noDifference}
        title="Update filters"
      >
        <SaveIcon color={noDifference ? "hsl(0, 0%, 75%)" : "hsl(0, 0%, 20%)"} />
      </button>

      <div class="hover-filter-diffs">
        <FilterDiffs filterDiffs={filterDiferences} />
      </div>

      <button onclick={handleXClick} title="Unselect user">
        <XIcon />
      </button>
    </div>
  </div>
{:else}
  <button
    class="no-user-selected"
    onclick={handleAddUserClick}
    disabled={filtersStore.isEmpty()}
  >
    <SaveIcon color="hsl(0, 0%, 20%)" />
    Spremi filtere
  </button>
{/if}

<style>
  /* Common */
  .filters-belonging-to-user-container,
  .no-user-selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem 1rem;
    background-color: hsl(0, 0%, 100%);
    border-radius: 0.5rem;

    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(0, 0%, 20%);

    transition: background-color 150ms ease-out;
  }

  /* No user selected */
  .no-user-selected {
    justify-content: center;
    background-color: hsl(0, 0%, 85%);
  }
  .no-user-selected[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  /* User selected */
  .filters-belonging-to-user-container {
    box-shadow: 0 0.125rem 0.25rem hsla(0, 0%, 0%, 0.075);
    /* -8px total, -4px top and bottom, to be same height as no-user-selected */
    padding: 0.25rem 1rem;
  }

  .filters-belonging-to-user-container > * {
    flex: 0;
  }
  .filters-belonging-to-user-container > p {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .action-buttons-container {
    position: relative;

    display: flex;
    gap: 0.5rem;
  }

  .filters-belonging-to-user-container button {
    display: flex;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 50%;
    transition: background-color 150ms ease-out;
  }
  .filters-belonging-to-user-container button:hover {
    background-color: hsl(0, 0%, 90%);
  }
  .filters-belonging-to-user-container button[disabled] {
    pointer-events: none;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid hsl(0, 0%, 90%);
  }

  .hover-filter-diffs {
    position: absolute;
    top: 100%;
    margin-top: 0.5rem;
    right: 0;
    z-index: 500;
    display: none;

    width: max-content;
    max-width: 16rem;
    padding: 0.5rem;
    background-color: hsl(0, 0%, 100%);
    border-radius: 1rem;
    box-shadow: 0 0.125rem 0.5rem hsla(0, 0%, 0%, 0.125);
  }

  #update-filters-button:hover + .hover-filter-diffs {
    display: block;
  }
</style>
