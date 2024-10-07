<script lang="ts">
  import Table from "../tables/Table.svelte";
  import { filteredOwners } from "../../stores/store";
  import Header1 from "../common/Header1.svelte";
</script>

<div class="owners-container">
  <Header1>Popis vlasnika</Header1>

  <Table showHeader={true} data={$filteredOwners} />
</div>

<style>
  .owners-container {
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }
</style>
