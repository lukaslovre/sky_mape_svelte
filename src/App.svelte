<script lang="ts">
  import { activeTab } from "./stores/store";
  import Header from "./components/header/Header.svelte";
  import SideNote from "./components/common/SideNote.svelte";
  import Map from "./components/map/Map.svelte";
  import PropertyPage from "./components/properties/PropertyPage.svelte";
  import ClientsPage from "./components/clients/ClientsPage.svelte";
  import OwnersPage from "./components/owners/OwnersPage.svelte";
  import InteractionsPage from "./components/interactions/InteractionsPage.svelte";
  import { onMount } from "svelte";
  import { propertyFormStore } from "./stores/propertiesFormStore";
  import TabMenu from "./components/header/TabMenu.svelte";

  // SideNote
  type SideNoteParams = {
    title: string;
    value: string;
  };
  let openSideNote: SideNoteParams | null = null;
  function setSideNote(params: SideNoteParams) {
    openSideNote = params;
  }

  onMount(() => {
    console.log(propertyFormStore.getAndTransformFields());
  });

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
      <Map
        on:openSideNote={(e) => {
          setSideNote(e.detail);
        }}
      />
    {:else if $activeTab === "Properties"}
      <PropertyPage
        on:openSideNote={(e) => {
          setSideNote(e.detail);
        }}
      />
    {:else if $activeTab === "Buyers"}
      <ClientsPage />
    {:else if $activeTab === "Owners"}
      <OwnersPage />
    {:else if $activeTab === "Interactions"}
      <InteractionsPage />
    {/if}
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
