<script lang="ts">
  import Header from "./components/header/Header.svelte";
  import SideNote from "./components/common/SideNote.svelte";
  import Map from "./components/map/Map.svelte";
  import PropertyPage from "./components/properties/PropertyPage.svelte";
  import ClientsPage from "./components/clients/ClientsPage.svelte";
  import OwnersPage from "./components/owners/OwnersPage.svelte";
  import { onMount } from "svelte";
  import { propertyFormStore } from "./stores/propertiesFormStore.svelte";
  import TabMenu from "./components/header/TabMenu.svelte";
  import { activeTab } from "./stores/uiStateStore";

  // SideNote
  type SideNoteParams = {
    title: string;
    value: string;
  };
  let openSideNote: SideNoteParams | null = $state(null);
  function setSideNote(params: SideNoteParams) {
    openSideNote = params;
  }

  // $effect(() => {
  //   propertyFormStore.print();
  // });

  // TODO: Check if it's better to do this here or in the .ts file of the store.
  // onMount(() => {
  //   propertyFormStore.initializeFields(propertyFormFields);
  //   clientFormStore.initializeFields(clientFormFields);
  // });
</script>

<main>
  <Header />

  <div class="content">
    <SideNote
      isOpen={openSideNote !== null}
      close={() => {
        openSideNote = null;
      }}
      title={openSideNote?.title || ""}
      value={openSideNote?.value || ""}
    />

    <TabMenu />

    {#if $activeTab === "Map"}
      <Map />
    {:else if $activeTab === "Properties"}
      <PropertyPage />
    {:else if $activeTab === "Buyers"}
      <ClientsPage />
    {:else if $activeTab === "Owners"}
      <OwnersPage />
    {/if}
    <!-- {:else if $activeTab === "Interactions"}
      <InteractionsPage /> -->
  </div>
</main>

<style>
  main {
    height: 100vh;

    display: flex;
    /* flex-direction: column; */
  }

  .content {
    height: 100vh;
    width: 100%;
    overflow: scroll;

    position: relative;
  }
</style>
