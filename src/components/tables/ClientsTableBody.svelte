<script lang="ts">
  import type { Client } from "../../types";
  import { formatDateAndAgo } from "../../lib/utils/datetime";
  import Popup from "../common/Popup.svelte";
  import Checkbox from "./general/Checkbox.svelte";
  import CopyableBodyCell from "./general/CopyableBodyCell.svelte";
  import { filtersStore } from "../../lib/stores/filtersStore.svelte";
  import { dataStore } from "../../lib/stores/store.svelte";
  import { trimText } from "../../lib/utils/string";
  import { uiStateStore } from "../../lib/stores/uiStateStore.svelte";

  interface Props {
    selectedIds?: Client["id"][];
    data: Client[];
    columns: (keyof Client)[];
    handleCheckboxClick: (propertyId: Client["id"], newState: boolean) => void;
    copyableColumnsKeys: (keyof Client)[];
  }

  let {
    selectedIds = [],
    data,
    columns,
    handleCheckboxClick,
    copyableColumnsKeys,
  }: Props = $props();

  // Helper Functions
  const isObject = (value: any): boolean => typeof value === "object" && value !== null;

  const isCopyable = (column: keyof Client): boolean =>
    copyableColumnsKeys.includes(column as string);

  /////////
  // Popup logic
  /////////

  let popup = $state({
    x: -1000,
    y: -1000,
    content: "",
  });

  // Show filters popup
  const showFiltersPopup = (userId: Client["id"], event: MouseEvent) => {
    // Get the target element
    const target = event.currentTarget as HTMLElement;

    if (!target || !(target instanceof HTMLElement)) {
      console.log("No target element found or not an HTMLElement");
      return;
    }

    // Get the target position
    const { right, top } = target.getBoundingClientRect();

    popup.x = right;
    popup.y = top - 8;

    // Get the user filters
    const userFilters = data.find((user) => user.id === userId)?.filters || null;

    if (!userFilters) {
      popup.content = "Nema filtera";
      return;
    }

    // remove keys with empty values
    const filteredUserFilters = filtersStore.removeEmptyFilterFields(userFilters);

    // Show the number of polygons instead of the array
    if (
      Array.isArray(filteredUserFilters.polygons) &&
      filteredUserFilters.polygons.length > 0
    ) {
      filteredUserFilters.polygons = filteredUserFilters.polygons.length as any;
    }

    popup.content = JSON.stringify(filteredUserFilters, null, 2);
  };

  // Hide filters popup
  const hideFiltersPopup = () => {
    popup = {
      x: -1000,
      y: -1000,
      content: "",
    };
  };

  // Handle applying filters
  const handleApplyFilters = (user: Client) => {
    dataStore.selectedClientIds = [user.id];
    filtersStore.loadFiltersFromClient(user);

    dataStore.resetFavoriteProperties();
    user.favoriteProperties.forEach((propertyId) => {
      dataStore.addPropertyToFavorites(propertyId);
    });
  };
</script>

<!-- Popup Component -->
{#if popup.content}
  <Popup screenLocation={[popup.x, popup.y]}>
    {popup.content}
  </Popup>
{/if}

<!-- Table Body -->
<tbody>
  {#each data as user (user.id)}
    <tr>
      <!-- Checkbox Cell. First Column -->
      <td>
        <Checkbox
          fieldId={user.id ?? ""}
          checked={selectedIds.includes(user.id)}
          updateState={handleCheckboxClick}
        />
      </td>

      <!-- Other, Dynamic Columns -->
      {#each columns as column}
        <td>
          {#if (!user[column] && typeof user[column] !== "boolean") || (Array.isArray(user[column]) && user[column].length === 0)}
            <span class="empty">N/A</span>
          {:else if ["updated", "created"].includes(column as string)}
            {formatDateAndAgo(new Date(user[column]))}
            <!-- {:else if ["note"].includes(column as string)}
            {trimText(user[column], 100)} -->
          {:else if column === "filters"}
            <button
              class="applyFiltersButton"
              onmouseenter={(e) => showFiltersPopup(user.id, e)}
              onmouseleave={hideFiltersPopup}
              onclick={() => handleApplyFilters(user)}
            >
              Postavi filtere
            </button>
          {:else if isCopyable(column)}
            <CopyableBodyCell value={user[column]} />
          {:else if isObject(user[column])}
            <!-- Array-like objects -->
            {#if user[column].length && user[column].length > 0}
              {user[column].join(", ")}
            {:else}
              {"Riješiti objekt"} {user[column]}
            {/if}
          {:else}
            {user[column]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</tbody>

<style>
  td {
    /* border: 1px solid hsl(0, 0%, 90%); */
    border-bottom: 1px solid hsl(0, 0%, 90%);
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    text-align: left;

    transition: background-color 100ms ease-out;
  }
  td {
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  tr:hover {
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 0.5rem;
  }
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 0.5rem;
  }

  /*  */

  .empty {
    color: hsl(0, 0%, 50%);
  }

  button.applyFiltersButton {
    padding: 0.5rem 0.75rem;
    background-color: hsla(216, 90%, 45%, 0.1);
    border-radius: 0.25rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.075);

    font-size: 0.875rem;
    font-weight: 600;
    color: #0b5eda;

    transition: background-color 200ms ease-out;
  }
  button.applyFiltersButton:hover {
    background-color: hsla(216, 90%, 45%, 0.2);
  }
</style>
