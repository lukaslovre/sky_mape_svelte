<script lang="ts">
  import { applyUserFilters } from "../../../stores/actions";
  import type { Filters, UserData } from "../../../types";
  import { parsePocketbaseUserData } from "../../../utils/buyers";
  import Popup from "../../common/Popup.svelte";
  import Checkbox from "./Checkbox.svelte";
  import CopyableCell from "./CopyableCell.svelte";

  // Define the type for parsed user data
  type ParsedUserData = ReturnType<typeof parsePocketbaseUserData>[0];

  // Props
  export let checkboxes: Record<string, boolean>;
  export let userData: UserData[];
  export let columns: (keyof ParsedUserData)[];
  export let updateCheckboxes: (newCheckboxes: Record<UserData["id"], boolean>) => void;

  // Reactive parsed user data (transforms the dates from string to Date objects)
  $: parsedUserData = parsePocketbaseUserData(userData);

  // Helper Functions
  // Check if a value is an object
  const isObject = (value: any): boolean => typeof value === "object" && value !== null;

  // Check if a value has a length property
  const hasLength = (value: any): boolean => typeof value.length === "number";

  // Check if a column is copyable
  const isCopyable = (column: keyof ParsedUserData): boolean =>
    ["email", "phone"].includes(column as string);

  const updateCheckboxState = (userId: string, checked: boolean) => {
    checkboxes = { ...checkboxes, [userId]: checked };
    updateCheckboxes(checkboxes);
  };

  /*
    divider
  */

  // Popup state
  let popupLocation: [number, number] = [0, 0];
  let popupContent: string = "";

  // Show filters popup
  const showFiltersPopup = (userId: UserData["id"], event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement;

    if (!target || !(target instanceof HTMLElement)) {
      console.log("No target element found or not an HTMLElement");
      return;
    }

    const { right, top } = target.getBoundingClientRect();

    // Position the popup near the button
    popupLocation = [right, top - 8];

    const userFilters = userData.find((user) => user.id === userId)?.filters || null;

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

  function removeEmptyValuesFromFilters(filters: Filters) {
    console.log("filters", filters);
    return Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            return value.length > 0;
          }
          return true;
        }
        return false;
      })
    );
  }

  // Hide filters popup
  const hideFiltersPopup = () => {
    console.log("hideFiltersPopup called");
    popupLocation = [-1000, -1000]; // Move off-screen instead of [0, 0]
    popupContent = "";
    console.log("Popup location reset to:", popupLocation);
    console.log("Popup content cleared");
  };

  // Handle applying filters
  const handleApplyFilters = (user: ParsedUserData) => {
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
  {#each parsedUserData as user}
    <tr>
      <!-- Checkbox Cell. First Column -->
      <td>
        <Checkbox
          value={user.id ?? ""}
          checked={checkboxes[user.id] ?? false}
          updateState={updateCheckboxState}
        />
      </td>

      <!-- Other, Dynamic Columns -->
      {#each columns as column}
        <td>
          {#if isObject(user[column])}
            <!-- Handle object values -->
            {#if hasLength(user[column])}
              <!-- Array-like objects -->
              {#if user[column].length > 0}
                {user[column].join(", ")}
              {:else}
                <span class="empty">N/A</span>
              {/if}
            {:else}
              <!-- Non-array objects (assumed to be filters) -->
              <button
                class="applyFiltersButton"
                on:mouseenter={(e) => showFiltersPopup(user.id, e)}
                on:mouseleave={hideFiltersPopup}
                on:click={() => handleApplyFilters(user)}
              >
                Primjeni
              </button>
            {/if}
          {:else if user[column] === ""}
            <!-- Empty string values -->
            <span class="empty">N/A</span>
          {:else if isCopyable(column)}
            <!-- Copyable values (email, phone) -->
            <CopyableCell value={user[column]} />
          {:else}
            <!-- All other values -->
            {user[column]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</tbody>

<style>
  th,
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
