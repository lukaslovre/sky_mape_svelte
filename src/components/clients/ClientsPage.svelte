<script lang="ts">
  import Table from "../tables/Table.svelte";
  import { filteredUsers } from "../../stores/store";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import Header1 from "../common/Header1.svelte";
  import SecondaryButton from "../common/SecondaryButton.svelte";
  import ColoredButton from "../common/ColoredButton.svelte";
  import ClientForm from "./ClientForm.svelte";

  let showForm = false;

  function toggleForm() {
    showForm = !showForm;
  }
</script>

<div class="buyers-container">
  <Header1>Popis kupaca</Header1>

  {#if !showForm}
    <div class="buttons-container">
      <SecondaryButton text="Spremi novog kupca" onClick={toggleForm}>
        <SaveIcon size={24} color={"#1a1a1a"} />
      </SecondaryButton>

      <ColoredButton text="Spremi kao tablicu" color="#067925">
        <SpreadsheetIcon size={24} />
      </ColoredButton>
    </div>
  {/if}

  {#if showForm}
    <ClientForm close={() => (showForm = false)} />
  {:else}
    <Table showHeader={true} data={$filteredUsers} />
  {/if}
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
