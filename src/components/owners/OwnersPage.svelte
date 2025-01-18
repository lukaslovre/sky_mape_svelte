<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import Header1 from "../common/Header1.svelte";
  import ClientsTable from "../tables/ClientsTable.svelte";
</script>

<div class="owners-container">
  <Header1>Popis vlasnika</Header1>

  <ClientsTable showHeader={true} data={dataStore.filteredOwners} />
</div>

<style>
  .owners-container {
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }
</style>
