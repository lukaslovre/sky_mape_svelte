<script lang="ts">
  import Table from "../tables/Table.svelte";
  import { filteredUsers } from "../../stores/store";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import Header1 from "../common/Header1.svelte";
  import ClientForm from "./ClientForm.svelte";
  import Menubar from "../common/Menubar.svelte";
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import TrashIcon from "../../assets/icons/TrashIcon.svelte";
  import type { MenuItem } from "../../types";

  let showForm = false;

  function toggleForm() {
    showForm = !showForm;
  }

  const menubarItems: MenuItem[] = [
    { label: "Dodaj", icon: SaveIcon },
    { label: "Uredi", icon: EditIcon },
    { label: "Obriši", icon: TrashIcon },
    { label: "Spremi kao tablicu", icon: SpreadsheetIcon },
  ];

  function handleItemClick(event: CustomEvent<MenuItem>) {
    const buttonLabel = event.detail.label;

    console.log(buttonLabel);

    if (buttonLabel === "Dodaj") {
      toggleForm();
    } else if (buttonLabel === "Uredi") {
      console.log("uredi");
    } else if (buttonLabel === "Obriši") {
      console.log("obriši");
    } else if (buttonLabel === "Spremi kao tablicu") {
      console.log("spremi kao tablicu");
    } else {
      console.log("Unknown button pressed in the ClientsPage menubar");
    }
  }
</script>

<div class="buyers-container">
  <Header1>Popis kupaca</Header1>

  {#if !showForm}
    <Menubar items={menubarItems} on:itemClick={handleItemClick} />
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
