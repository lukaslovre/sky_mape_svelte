<!-- Ovo je namijenjeno prvo kao generalni table ali mislim da ću specificirati za popis kupaca samo -->

<script lang="ts">
  import type { UserData } from "../types";

  export let showHeader: boolean = true;
  export let data: UserData[] = [];

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
</script>

<section class="table-container">
  <table>
    {#if showHeader && data.length > 0}
      <thead>
        <tr>
          {#each Object.keys(parseData(data)[0]) as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
    {/if}

    <tbody>
      {#each parseData(data) as user}
        <tr>
          {#each Object.entries(user) as [key, value]}
            {#if typeof value === "object"}
              {#if value.length !== undefined}
                {#if value.length > 0}
                  <td>{value.join(", ")}</td>
                {:else}
                  <td class="empty">N/A</td>
                {/if}
              {:else}
                <td>{JSON.stringify(value, null, 1)}</td>
              {/if}
            {:else if value === ""}
              <td class="empty">N/A</td>
            {:else if ["email", "phone"].includes(key)}
              <td class="copyable">{value}</td>
            {:else}
              <td>{value}</td>
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
</style>
