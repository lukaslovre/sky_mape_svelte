<script lang="ts">
  import type { DialogType } from "../../types";
  import Table from "../Table/Table.svelte";
  import { filteredUsers } from "../../stores/store";

  import Header1 from "../General components/Header1.svelte";

  export let setDialog: (dialog: DialogType | null) => void;
</script>

<div class="owners-container">
  <Header1>Popis vlasnika</Header1>

  <Table showHeader={true} data={$filteredUsers} />
</div>

<style>
  .owners-container {
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }
</style>
