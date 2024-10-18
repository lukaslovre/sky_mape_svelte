<script lang="ts">
  import Table from "../tables/clientsTable/Table.svelte";
  import { filteredUsers } from "../../stores/store";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import Header1 from "../common/Header1.svelte";
  import ClientForm from "./ClientForm.svelte";
  import Menubar from "../common/Menubar.svelte";
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import TrashIcon from "../../assets/icons/TrashIcon.svelte";
  import type { MenuItem } from "../../types";
  import { clientFormStore } from "../../stores/clientFormStore";
  import { deleteUser } from "../../models/Clients";

  let showForm = false;
  let selectedClientIds: string[] = [];

  function toggleForm() {
    showForm = !showForm;
  }

  let menubarItems: MenuItem[] = [
    { label: "Dodaj", icon: SaveIcon, disabled: false },
    { label: "Uredi", icon: EditIcon, disabled: true },
    { label: "Obriši", icon: TrashIcon, disabled: true },
    { label: "Spremi kao tablicu", icon: SpreadsheetIcon, disabled: false },
  ];

  function handleItemClick(event: CustomEvent<MenuItem>) {
    const buttonLabel = event.detail.label;

    console.log(buttonLabel);

    if (buttonLabel === "Dodaj") {
      toggleForm();
    } else if (buttonLabel === "Uredi") {
      if (selectedClientIds.length === 1) {
        const selectedClient = findSelectedClient(selectedClientIds[0]);

        if (selectedClient) {
          clientFormStore.setFieldValues(selectedClient);
          toggleForm();
        }
      }
    } else if (buttonLabel === "Obriši") {
      if (selectedClientIds.length > 0) {
        // Create a new array of promises
        const promises = selectedClientIds.map(async (id) => {
          await deleteUser(id);
        });

        // Wait for all promises to resolve
        Promise.all(promises)
          .then(() => {
            alert("Klijenti obrisani");
          })
          .catch((err) => {
            console.error("Error deleting users:", err);
          });
      }
    } else if (buttonLabel === "Spremi kao tablicu") {
      console.log("spremi kao tablicu");
    } else {
      console.log("Unknown button pressed in the ClientsPage menubar");
    }
  }

  function findSelectedClient(id: string) {
    return $filteredUsers.find((user) => user.id === id);
  }

  function updateMenubarItems(rowsSelected: number) {
    // Set all to enabled
    menubarItems.map((item) => {
      item.disabled = false;
      return item;
    });

    // Now apply rules based on the number of rows selected
    if (rowsSelected === 0) {
      setItemWithLabelToDisabled("Uredi");
      setItemWithLabelToDisabled("Obriši");
    }
    if (rowsSelected > 1) {
      setItemWithLabelToDisabled("Uredi");
    }

    // trigger re-render
    menubarItems = menubarItems;
  }

  function setItemWithLabelToDisabled(label: string) {
    menubarItems.map((item) => {
      if (item.label === label) {
        item.disabled = true;
      }
      return item;
    });
  }

  function handleCheckboxChange(event: CustomEvent<string[]>) {
    selectedClientIds = event.detail;
    console.log(selectedClientIds);

    updateMenubarItems(selectedClientIds.length);
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
    <Table
      showHeader={true}
      data={$filteredUsers}
      on:checkboxesChanged={handleCheckboxChange}
    />
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
