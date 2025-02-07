<script lang="ts">
  import type { Client, MenuItem } from "../../types";
  import { dataStore } from "../../stores/store.svelte";
  import Header1 from "../common/Header1.svelte";
  import ClientForm from "./ClientForm.svelte";
  import { deleteUser } from "../../models/Clients";
  import ClientsMenubar from "./ClientsMenubar.svelte";
  import ClientsTable from "../tables/ClientsTable.svelte";
  import { clientFormStore } from "../../stores/clientsFormStore.svelte";
  import { uiStateStore } from "../../stores/uiStateStore.svelte";

  $effect(() => {
    removeUnfilteredClientsFromSelection(dataStore.filteredUsers);
  });

  function removeUnfilteredClientsFromSelection(filteredClients: Client[]) {
    // Remove clients that are no longer in the filteredUsers store
    const newSelectedClientIds = dataStore.selectedClientIds.filter((id) => {
      return filteredClients.some((client) => client.id === id);
    });

    // Check if actually changed
    if (newSelectedClientIds.length !== dataStore.selectedClientIds.length) {
      dataStore.selectedClientIds = newSelectedClientIds;
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
    const clientIdField = clientFormStore.getFieldByDatabaseFieldName("id")?.value;

    const clientAgencyIdField =
      clientFormStore.getFieldByDatabaseFieldName("agency_id")?.value;

    if (clientIdField !== "" && clientIdField !== undefined) {
      // If id field is not empty, reset the form
      clientFormStore.resetForm();
    } else if (!clientAgencyIdField) {
      // If agency_id field is not empty, reset the form
      clientFormStore.resetForm();
    }

    clientFormStore.setFieldValue("userType", ["buyer"]);
    uiStateStore.clientFormVisible = true;
  }

  // Alerts that saving as table is not implemented
  function handleSaveAsTable() {
    alert(`"Spremi kao tablicu" još nije implementirano.`);
  }

  // Handles editing of a selected property
  function handleEdit() {
    const clientIdField = clientFormStore.getFieldByDatabaseFieldName("id")?.value;
    const selectedClient = findSelectedClient(dataStore.selectedClientIds[0]);

    if (selectedClient) {
      if (clientIdField !== selectedClient.id) {
        // If id field is not empty, reset the form
        clientFormStore.resetForm();
        clientFormStore.setFieldValuesFromClientObject(selectedClient);
      }

      uiStateStore.clientFormVisible = true;
    }
  }

  // Deletes selected properties
  function handleDelete() {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${dataStore.selectedClientIds.length} selected clients?`
    );
    if (!confirmDeletion) return;

    const promises = dataStore.selectedClientIds.map((id) => deleteUser(id));

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
      if (!dataStore.selectedClientIds.includes(clientId)) {
        dataStore.selectedClientIds.push(clientId);
      }
    } else {
      dataStore.selectedClientIds = dataStore.selectedClientIds.filter(
        (id) => id !== clientId
      );
    }
  }
</script>

<div class="buyers-container">
  <Header1>Popis kupaca</Header1>

  {#if !uiStateStore.clientFormVisible}
    <ClientsMenubar
      selectedClientsLength={dataStore.selectedClientIds.length}
      onMenuItemClick={handleMenuItemClick}
    />

    <ClientsTable
      showHeader={true}
      data={dataStore.filteredUsers}
      {handleCheckboxClick}
      selectedClientIds={dataStore.selectedClientIds}
    />
  {:else}
    <ClientForm
      close={() => {
        uiStateStore.clientFormVisible = false;
      }}
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
