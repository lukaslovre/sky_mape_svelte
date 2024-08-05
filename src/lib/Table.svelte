<!-- Ovo je namijenjeno prvo kao generalni table ali mislim da ću specificirati za popis kupaca samo -->

<script lang="ts">
  import type { Filters, UserData } from "../types";
  import Popup from "./General components/Popup.svelte";

  export let showHeader: boolean = true;
  export let data: UserData[] = [];

  type ParsedUserData = ReturnType<typeof parseData>[0];

  let columnOrder: (keyof ParsedUserData)[] = [
    "id",
    "name",
    "email",
    "phone",
    "note",
    "created",
    "updated",
    "favoriteProperties",
    "filters",
  ];

  function parseData(data: UserData[]) {
    return data.map((user) => {
      const { collectionId, collectionName, ...columnsToKeep } = user;

      return {
        ...columnsToKeep,
        created: new Date(columnsToKeep.created).toLocaleDateString("hr-HR"),
        updated: new Date(columnsToKeep.updated).toLocaleDateString("hr-HR"),
      };
    });
  }

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
      data.find((user) => user.id === userId)?.filters || null;

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

<section class="table-container">
  <table>
    {#if showHeader && data.length > 0}
      <thead>
        <tr>
          {#each columnOrder as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
    {/if}

    <tbody>
      {#each parseData(data) as user}
        <tr>
          {#each columnOrder as key}
            {#if typeof user[key] === "object"}
              {#if user[key].length !== undefined}
                {#if user[key].length > 0}
                  <td>{user[key].join(", ")}</td>
                {:else}
                  <td class="empty">N/A</td>
                {/if}
              {:else}
                <!-- <td>{JSON.stringify(user[key], null, 1)}</td> -->
                <td>
                  <button
                    class="applyFiltersButton"
                    on:mouseenter={(e) => {
                      showFiltersPopup(user.id, e);
                    }}
                    on:mouseleave={hideFiltersPopup}>Primjeni</button
                  >
                </td>
              {/if}
            {:else if user[key] === ""}
              <td class="empty">N/A</td>
            {:else if ["email", "phone"].includes(key)}
              <td class="copyable">{user[key]}</td>
            {:else}
              <td>{user[key]}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  .table-container {
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    /* border: 1px solid hsl(0, 0%, 90%); */
    border-bottom: 1px solid hsl(0, 0%, 90%);
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    text-align: left;
  }

  th {
    background-color: #fff;
  }

  td {
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  tr th:first-child {
    border-top-left-radius: 0.5rem;
  }
  tr th:last-child {
    border-top-right-radius: 0.5rem;
  }
  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 0.5rem;
  }
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 0.5rem;
  }

  .copyable {
    color: #0b5eda;
  }

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
