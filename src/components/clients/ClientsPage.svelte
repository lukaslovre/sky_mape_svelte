<script lang="ts">
  import type { Client, MenuItem } from "../../types";
  import { dataStore } from "../../stores/store.svelte";
  import Header1 from "../common/Header1.svelte";
  import ClientForm from "./ClientForm.svelte";
  import { clientFormStore } from "../../stores/clientFormStore";
  import { deleteUser } from "../../models/Clients";
  import ClientsMenubar from "./ClientsMenubar.svelte";
  import ClientsTable from "../tables/ClientsTable.svelte";

  let showForm: boolean = $state(false);
  let selectedClientIds: string[] = $state([]);

  $effect(() => {
    removeUnfilteredClientsFromSelection(dataStore.filteredUsers);
  });

  function removeUnfilteredClientsFromSelection(filteredClients: Client[]) {
    // Remove clients that are no longer in the filteredUsers store
    const newSelectedClientIds = selectedClientIds.filter((id) => {
      return filteredClients.some((client) => client.id === id);
    });

    // Check if actually changed
    if (newSelectedClientIds.length !== selectedClientIds.length) {
      selectedClientIds = newSelectedClientIds;
    }
  }

  function handleMenuItemClick(item: MenuItem) {
    const buttonLabel = item.label;
    console.log(`${buttonLabel} label clicked in ClientsPage.`);

    switch (buttonLabel) {
      case "Dodaj":
        handleAdd();
        break;

      case "Spremi kao tablicu":
        handleSaveAsTable();
        break;

      case "Uredi":
        handleEdit();
        break;

      case "Obriši":
        handleDelete();
        break;

      default:
        console.log("Unknown button pressed in the ClientsPage menubar");
    }
  }

  function handleAdd() {
    // propertyFormStore.resetForm();
    showForm = true;
  }

  // Alerts that saving as table is not implemented
  function handleSaveAsTable() {
    alert(`"Spremi kao tablicu" još nije implementirano.`);
  }

  // Handles editing of a selected property
  function handleEdit() {
    // const selectedProperty = findSelectedProperty(dataStore.selectedPropertyIds[0]);
    // if (selectedProperty) {
    //   propertyFormStore.resetForm();
    //   propertyFormStore.setFieldValuesFromPropertyObject(selectedProperty);
    //   showForm = true;
    // }
  }

  // Deletes selected properties
  function handleDelete() {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${selectedClientIds.length} selected clients?`
    );
    if (!confirmDeletion) return;

    // const promises = dataStore.selectedPropertyIds.map((id) => deleteProperty(id));

    // Promise.all(promises)
    //   .then(() => {
    //     alert("Sve nekretnine uspješno obrisane!");
    //   })
    //   .catch((err) => {
    //     console.error("Error deleting properties:", err);
    //     alert("Barem jedna nekretnina nije uspješno obrisana.");
    //   });
  }

  function findSelectedClient(id: string) {
    return dataStore.filteredUsers.find((user) => user.id === id);
  }

  function handleCheckboxClick(clientId: Client["id"], newState: boolean): void {
    // True = ON, False = OFF
    if (newState) {
      if (!selectedClientIds.includes(clientId)) {
        selectedClientIds.push(clientId);
      }
    } else {
      selectedClientIds = selectedClientIds.filter((id) => id !== clientId);
    }
  }
</script>

<div class="buyers-container">
  <Header1>Popis kupaca</Header1>

  {#if !showForm}
    <ClientsMenubar
      selectedClientsLength={selectedClientIds.length}
      onMenuItemClick={handleMenuItemClick}
    />

    <ClientsTable
      showHeader={true}
      data={dataStore.filteredUsers}
      {handleCheckboxClick}
      {selectedClientIds}
    />
  {:else}
    <ClientForm close={() => (showForm = false)} />
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
