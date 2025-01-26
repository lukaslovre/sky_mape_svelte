<script lang="ts">
  import type { Client, MenuItem } from "../../types";
  import { dataStore } from "../../stores/store.svelte";
  import Header1 from "../common/Header1.svelte";
  import ClientForm from "./ClientForm.svelte";
  import { deleteUser } from "../../models/Clients";
  import ClientsMenubar from "./ClientsMenubar.svelte";
  import ClientsTable from "../tables/ClientsTable.svelte";
  import { clientFormStore } from "../../stores/clientsFormStore.svelte";

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
    const clientIdField = clientFormStore.fields.find(
      (field) => field.databaseFieldName === "id"
    )?.value;

    const clientAgencyIdField = clientFormStore.fields.find(
      (field) => field.databaseFieldName === "agency_id"
    )?.value;

    if (clientIdField !== "" && clientIdField !== undefined) {
      // If id field is not empty, reset the form
      clientFormStore.resetForm();
    } else if (!clientAgencyIdField) {
      // If agency_id field is not empty, reset the form
      clientFormStore.resetForm();
    }

    clientFormStore.setFieldValue("userType", ["buyer"]);
    showForm = true;
  }

  // Alerts that saving as table is not implemented
  function handleSaveAsTable() {
    alert(`"Spremi kao tablicu" još nije implementirano.`);
  }

  // Handles editing of a selected property
  function handleEdit() {
    const clientIdField = clientFormStore.fields.find(
      (field) => field.databaseFieldName === "id"
    )?.value;

    const selectedClient = findSelectedClient(selectedClientIds[0]);

    if (selectedClient) {
      if (clientIdField !== selectedClient.id) {
        // If id field is not empty, reset the form
        clientFormStore.resetForm();
        clientFormStore.setFieldValuesFromClientObject(selectedClient);
      }

      showForm = true;
    }
  }

  // Deletes selected properties
  function handleDelete() {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${selectedClientIds.length} selected clients?`
    );
    if (!confirmDeletion) return;

    const promises = selectedClientIds.map((id) => deleteUser(id));

    Promise.all(promises)
      .then(() => {
        alert("Svi odabrani kupci su uspješno obrisani.");
      })
      .catch((err) => {
        console.error("Error deleting clients:", err);
        alert("Barem jedan odabrani kupac nije obrisan.");
      });
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
