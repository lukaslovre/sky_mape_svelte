<script lang="ts">
  import CheckmarkIcon from "../../../assets/icons/CheckmarkIcon.svelte";
  import { applyUserFilters } from "../../../store";
  import type { Filters, UserData } from "../../../types";
  import { parsePocketbaseUserData } from "../../../utils/buyers";
  import Popup from "../../General components/Popup.svelte";
  import CopyableCell from "./CopyableCell.svelte";

  type ParsedUserData = ReturnType<typeof parsePocketbaseUserData>[0];

  // Props
  export let checkboxes: Record<string, boolean>;
  export let userData: UserData[];
  export let columns: (keyof ParsedUserData)[];

  // Popup state
  let popupLocation: [number, number] = [0, 0];
  let popupContent: string = "";

  // Reactive parsed user data
  $: parsedUserData = parsePocketbaseUserData(userData);

  // Helper Functions
  const isObject = (value: any): boolean => typeof value === "object" && value !== null;

  const hasLength = (value: any): boolean => typeof value.length === "number";

  const isCopyable = (column: keyof ParsedUserData): boolean =>
    ["email", "phone"].includes(column as string);

  // Event Handlers
  const toggleCheckbox = (userId: string) => {
    checkboxes[userId] = !checkboxes[userId];
  };

  const showFiltersPopup = (userId: UserData["id"], event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;

    const rect = target.getBoundingClientRect();

    // Position the popup near the button
    popupLocation = [rect.right, rect.top - 10];

    const userFilters = userData.find((user) => user.id === userId)?.filters || null;

    if (userFilters) {
      const polygonsCount = userFilters.polygons.length;
      popupContent = JSON.stringify(
        {
          ...userFilters,
          polygons: polygonsCount,
        },
        null,
        2
      );
    } else {
      popupContent = "Nema filtera";
    }
  };

  const hideFiltersPopup = () => {
    popupLocation = [0, 0];
    popupContent = "";
  };

  const handleApplyFilters = (user: ParsedUserData) => {
    applyUserFilters(user.filters, user.favoriteProperties);
  };
</script>

<!-- Popup Component -->
<Popup screenLocation={popupLocation}>
  {popupContent}
</Popup>

<!-- Table Body -->
<tbody>
  {#each parsedUserData as user}
    <tr>
      <!-- Checkbox Cell -->
      <td>
        <input
          type="checkbox"
          name={`selected-${user.id}`}
          id={`selected-${user.id}`}
          checked={checkboxes[user.id]}
          on:change|stopPropagation={() => toggleCheckbox(user.id)}
        />
        <label for={`selected-${user.id}`}>
          {#if checkboxes[user.id]}
            <CheckmarkIcon />
          {/if}
        </label>
      </td>

      <!-- Dynamic Columns -->
      {#each columns as column}
        <td>
          {#if isObject(user[column])}
            {#if hasLength(user[column])}
              {#if user[column].length > 0}
                {user[column].join(", ")}
              {:else}
                <span class="empty">N/A</span>
              {/if}
            {:else}
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
            <span class="empty">N/A</span>
          {:else if isCopyable(column)}
            <CopyableCell value={user[column]} />
          {:else}
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

  input[type="checkbox"] {
    display: none;
  }
  label {
    cursor: pointer;

    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    background-color: transparent;
    border: 2px solid #808080;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="checkbox"]:checked + label {
    background-color: #0b5eda;
    border-color: #0b5eda;
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
