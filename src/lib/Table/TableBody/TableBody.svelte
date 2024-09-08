<script lang="ts">
  import CheckmarkIcon from "../../../assets/icons/CheckmarkIcon.svelte";
  import { applyUserFilters } from "../../../store";
  import type { Filters, UserData } from "../../../types";
  import { parsePocketbaseUserData } from "../../../utils/buyers";
  import Popup from "../../General components/Popup.svelte";
  import CopyableCell from "./CopyableCell.svelte";

  type ParsedUserData = ReturnType<typeof parsePocketbaseUserData>[0];

  export let checkboxes: Record<string, boolean>;
  export let userData: UserData[];
  export let columns: (keyof ParsedUserData)[];

  let popupLocation: [number, number] = [0, 0];
  let popupContent: string = "";
  function showFiltersPopup(userId: UserData["id"], event: MouseEvent) {
    if (!event.target) return;

    console.log(event);

    const targetButton = event.target as HTMLButtonElement;

    const buttonLocation = targetButton.getBoundingClientRect();

    // set the popupLocation to the top-center of the button
    popupLocation = [
      // buttonLocation.left + buttonLocation.width / 2,
      buttonLocation.right,
      buttonLocation.top - 10,
    ];

    const userFilters: Filters | null =
      userData.find((user) => user.id === userId)?.filters || null;

    if (userFilters) {
      const removedPolygonValues = userFilters.polygons.length;

      popupContent = JSON.stringify(
        {
          ...userFilters,
          polygons: removedPolygonValues,
        },
        null,
        1
      );
    } else {
      popupContent = "Nema filtera";
    }
  }
  function hideFiltersPopup() {
    popupLocation = [0, 0];
    popupContent = "";
  }
</script>

<Popup screenLocation={popupLocation}>
  {popupContent}
</Popup>

<tbody>
  {#each parsePocketbaseUserData(userData) as user}
    <tr>
      <td>
        <input
          type="checkbox"
          name={`selected-${user.id}`}
          id={`selected-${user.id}`}
          checked={checkboxes[user.id]}
        />
        <label
          for={`selected-${user.id}`}
          on:click|stopPropagation|preventDefault={() => {
            checkboxes[user.id] = !checkboxes[user.id];
          }}
        >
          {#if checkboxes[user.id]}
            <CheckmarkIcon />
          {/if}
        </label>
      </td>
      {#each columns as column}
        {#if typeof user[column] === "object"}
          {#if user[column].length !== undefined}
            {#if user[column].length > 0}
              <td>{user[column].join(", ")}</td>
            {:else}
              <td class="empty">N/Aa</td>
            {/if}
          {:else}
            <!-- <td>{JSON.stringify(user[key], null, 1)}</td> -->
            <td>
              <button
                class="applyFiltersButton"
                on:mouseenter={(e) => {
                  showFiltersPopup(user.id, e);
                }}
                on:mouseleave={hideFiltersPopup}
                on:click={() => {
                  applyUserFilters(user.filters, user.favoriteProperties);
                }}
              >
                Primjeni
              </button>
            </td>
          {/if}
        {:else if user[column] === ""}
          <td class="empty">N/A</td>
        {:else if ["email", "phone"].includes(column)}
          <CopyableCell value={user[column]} />
        {:else}
          <td>{user[column]}</td>
        {/if}
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
