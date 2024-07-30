<script lang="ts">
  export let showHeader: boolean = true;
  export let headers: string[] = [];
  export let data: Record<string, any>[] = [];
</script>

<section class="table-container">
  <table>
    {#if showHeader}
      <thead>
        <tr>
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
    {/if}

    <tbody>
      {#each data as row}
        <tr>
          {#each Object.entries(row) as [key, value]}
            {#if typeof value === "object"}
              {#if value.length}
                <td>{value.join(", ")}</td>
              {:else}
                <td>{JSON.stringify(value, null, 1)}</td>
              {/if}
            {:else}
              <td class:copyable={key === "contact"}>{value}</td>
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
</style>
