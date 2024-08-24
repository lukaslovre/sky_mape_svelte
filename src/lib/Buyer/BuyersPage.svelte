<script lang="ts">
  import type { DialogType } from "../../types";
  import Table from "../Table.svelte";
  import { users, filteredUsers } from "../../store";
  import SecondaryButton from "../General components/SecondaryButton.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import ColoredButton from "../General components/ColoredButton.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";

  export let setDialog: (dialog: DialogType | null) => void;
</script>

<div class="buyers-container">
  <h2>Popis kupaca</h2>

  <div class="buttons-container">
    <SecondaryButton text="Spremi novog kupca" onClick={() => setDialog("saveBuyer")}>
      <SaveIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>

    <ColoredButton text="Spremi kao tablicu" color="#067925">
      <SpreadsheetIcon size={24} />
    </ColoredButton>
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

  .buttons-container {
    display: flex;
    justify-content: space-between;
  }
  .buttons-container > div {
    display: flex;
    column-gap: 1.25rem;
  }
</style>
