<script lang="ts">
  import type { DialogType } from "../../types";
  import Table from "../Table.svelte";
  import { users, filteredUsers } from "../../store";
  import SecondaryButton from "../General components/SecondaryButton.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";

  export let setDialog: (dialog: DialogType | null) => void;
</script>

<div class="buyers-container">
  <h2>Popis kupaca</h2>

  <div class="buttons-container">
    <SecondaryButton text="Spremi novog kupca" onClick={() => setDialog("saveBuyer")}>
      <SaveIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>
  </div>

  <Table showHeader={true} data={$filteredUsers} />
</div>

<style>
  .buyers-container {
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }
</style>
