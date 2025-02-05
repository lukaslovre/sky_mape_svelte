<script lang="ts">
  import { deleteUser } from "../../models/Clients";
  import { clientFormStore } from "../../stores/clientsFormStore.svelte";
  import { dataStore } from "../../stores/store.svelte";
  import { uiStateStore } from "../../stores/uiStateStore.svelte";
  import type { Client, MenuItem } from "../../types";
  import ClientForm from "../clients/ClientForm.svelte";
  import ClientsMenubar from "../clients/ClientsMenubar.svelte";
  import Header1 from "../common/Header1.svelte";
  import OwnersTable from "../tables/OwnersTable.svelte";

  $effect(() => {
    removeUnfilteredOwnersFromSelection(dataStore.filteredOwners);
  });

  function removeUnfilteredOwnersFromSelection(filteredUsers: Client[]) {
    // Remove owners that are no longer in the filteredOwners store
    const newSelectedOwnerIds = dataStore.selectedOwnerIds.filter((id) => {
      return filteredUsers.some((client) => client.id === id);
    });

    // Check if actually changed
    if (newSelectedOwnerIds.length !== dataStore.selectedOwnerIds.length) {
      dataStore.selectedOwnerIds = newSelectedOwnerIds;
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

    clientFormStore.setFieldValue("userType", ["seller"]);
    uiStateStore.ownerFormVisible = true;
  }

  // Alerts that saving as table is not implemented
  function handleSaveAsTable() {
    alert(`"Spremi kao tablicu" još nije implementirano.`);
  }

  // Handles editing of a selected owner
  function handleEdit() {
    const clientIdField = clientFormStore.getFieldByDatabaseFieldName("id")?.value;

    const selectedClient = findSelectedOwner(dataStore.selectedOwnerIds[0]);

    if (selectedClient) {
      if (clientIdField !== selectedClient.id) {
        // If id field is not empty, reset the form
        clientFormStore.resetForm();
        clientFormStore.setFieldValuesFromClientObject(selectedClient);
      }

      uiStateStore.ownerFormVisible = true;
    }
  }

  // Deletes selected owners
  function handleDelete() {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${dataStore.selectedOwnerIds.length} selected clients?`
    );
    if (!confirmDeletion) return;

    const promises = dataStore.selectedOwnerIds.map((id) => deleteUser(id));

    Promise.all(promises)
      .then(() => {
        alert("Svi odabrani vlasnici su uspješno obrisani.");
      })
      .catch((err) => {
        console.error("Error deleting clients:", err);
        alert("Barem jedan odabrani vlasnik NIJE obrisan.");
      });
  }

  function findSelectedOwner(id: string) {
    return dataStore.filteredOwners.find((owner) => owner.id === id);
  }

  function handleCheckboxClick(ownerid: Client["id"], newState: boolean): void {
    // True = ON, False = OFF
    if (newState) {
      if (!dataStore.selectedOwnerIds.includes(ownerid)) {
        dataStore.selectedOwnerIds.push(ownerid);
      }
    } else {
      dataStore.selectedOwnerIds = dataStore.selectedOwnerIds.filter(
        (id) => id !== ownerid
      );
    }
  }
</script>

<div class="owners-container">
  <Header1>Popis vlasnika</Header1>

  {#if !uiStateStore.ownerFormVisible}
    <ClientsMenubar
      selectedClientsLength={dataStore.selectedOwnerIds.length}
      onMenuItemClick={handleMenuItemClick}
    />

    <OwnersTable
      showHeader={true}
      data={dataStore.filteredOwners}
      {handleCheckboxClick}
      selectedOwnerIds={dataStore.selectedOwnerIds}
    />
  {:else}
    <ClientForm close={() => (uiStateStore.ownerFormVisible = false)} />
  {/if}
</div>

<style>
  .owners-container {
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }
</style>
