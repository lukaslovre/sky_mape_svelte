<script lang="ts">
  import type { Filters, Client } from "../../types";
  import { applyUserFilters } from "../../stores/actions";
  import { formatDateAndAgo } from "../../utils/datetime";
  import { removeEmptyValuesFromFilters } from "../../utils/filter";
  import Popup from "../common/Popup.svelte";
  import Checkbox from "./general/Checkbox.svelte";
  import CopyableBodyCell from "./general/CopyableBodyCell.svelte";

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

  /*
    divider
    TODO: check this
  */

  // Popup state
  let popupLocation: [number, number] = $state([0, 0]);
  let popupContent: string = $state("");

  // Show filters popup
  const showFiltersPopup = (userId: Client["id"], event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement;

    if (!target || !(target instanceof HTMLElement)) {
      console.log("No target element found or not an HTMLElement");
      return;
    }

    const { right, top } = target.getBoundingClientRect();

    // Position the popup near the button
    popupLocation = [right, top - 8];

    const userFilters = data.find((user) => user.id === userId)?.filters || null;

    if (!userFilters) {
      popupContent = "Nema filtera";
      return;
    }

    // remove keys with empty values
    const filteredUserFilters = removeEmptyValuesFromFilters(userFilters);

    if (filteredUserFilters?.polygons?.length) {
      filteredUserFilters.polygons = filteredUserFilters.polygons.length;
    }

    popupContent = JSON.stringify(filteredUserFilters, null, 2);
    console.log("Popup content set to:", popupContent);
  };

  // Hide filters popup
  const hideFiltersPopup = () => {
    console.log("hideFiltersPopup called");
    popupLocation = [-1000, -1000]; // Move off-screen instead of [0, 0]
    popupContent = "";
    console.log("Popup location reset to:", popupLocation);
    console.log("Popup content cleared");
  };

  // Handle applying filters
  const handleApplyFilters = (user: Client) => {
    console.log("handleApplyFilters called with user:", user);
    console.log("Applying filters:", user.filters);
    console.log("Favorite properties:", user.favoriteProperties);
    if (user.filters || user.favoriteProperties) {
      applyUserFilters(user.filters, user.favoriteProperties);
    }
  };
</script>

<!-- Popup Component -->
{#if popupContent}
  <Popup screenLocation={popupLocation}>
    {popupContent}
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
          {#if !user[column] && typeof user[column] !== "boolean"}
            <span class="empty">N/A</span>
          {:else if ["updated", "created"].includes(column as string)}
            {formatDateAndAgo(new Date(user[column]))}
          {:else if column === "filters"}
            <button
              class="applyFiltersButton"
              onmouseenter={(e) => showFiltersPopup(user.id, e)}
              onmouseleave={hideFiltersPopup}
              onclick={() => handleApplyFilters(user)}
            >
              Primjeni
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
