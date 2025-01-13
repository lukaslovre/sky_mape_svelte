<script lang="ts">
  import type { MenuItem } from "../../types";
  import Table from "../tables/clientsTable/Table.svelte";
  import { filteredUsers } from "../../stores/store";
  import Header1 from "../common/Header1.svelte";
  import ClientForm from "./ClientForm.svelte";
  import { clientFormStore } from "../../stores/clientFormStore";
  import { deleteUser } from "../../models/Clients";
  import ClientsMenubar from "./ClientsMenubar.svelte";

  let showForm = $state(false);
  let selectedClientIds: string[] = $state([]);

  function toggleForm() {
    showForm = !showForm;
  }

  function handleItemClick(event: CustomEvent<MenuItem>) {
    const buttonLabel = event.detail.label;
    console.log(`'${buttonLabel}' label clicked.`);

    if (buttonLabel === "Dodaj") {
      // Toggle form visibility
      toggleForm();
    } else if (buttonLabel === "Uredi") {
      // Insert selected client values into form
      if (selectedClientIds.length !== 1) return;

      const selectedClient = findSelectedClient(selectedClientIds[0]);

      if (selectedClient) {
        clientFormStore.setFieldValues(selectedClient);
        toggleForm();
      }
    } else if (buttonLabel === "Obriši") {
      // Delete selected clients
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
      // Save selected clients as a table
    } else {
      // Unknown button pressed in the ClientsPage menubar
      console.log("Unknown button pressed in the ClientsPage menubar");
    }
  }

  function findSelectedClient(id: string) {
    return $filteredUsers.find((user) => user.id === id);
  }

  function handleCheckboxChange(event: CustomEvent<string[]>) {
    selectedClientIds = event.detail;
    console.log(selectedClientIds);
  }
</script>

<div class="buyers-container">
  <Header1>Popis kupaca</Header1>

  {#if !showForm}
    <ClientsMenubar selectedClientsLength={selectedClientIds.length} {handleItemClick} />
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
</style>
