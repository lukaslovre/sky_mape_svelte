<script lang="ts">
  import type { DialogType } from "../../types";
  import Table from "../Table.svelte";
  import { users } from "../../store";

  export let setDialog: (dialog: DialogType | null) => void;
</script>

<div class="buyers-container">
  <h2>Popis kupaca</h2>

  <button
    on:click={() => {
      setDialog("saveBuyer");
    }}>Spremi novog kupca</button
  >

  <Table showHeader={true} headers={Object.keys($users[0] || {})} data={$users} />
</div>

<style>
  h2 {
    margin-bottom: 1.5rem;
  }

  .buyers-container {
    padding: 2.5rem;
  }
  .buyers-container button {
    margin-bottom: 1.5rem;

    padding: 0.5rem 1rem;
    background-color: hsl(0, 0%, 80%);
    border-radius: 0.25rem;
  }
</style>
