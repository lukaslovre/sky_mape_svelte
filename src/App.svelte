<script lang="ts">
  import type { DialogType, Filters, Property, UserData } from "./types";
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  // import { properties } from "./assets/propertiesData";

  import Dialog from "./lib/Dialog.svelte";
  import PropertyCard from "./lib/Property/PropertyCard.svelte";

  import {
    activeTab,
    filteredProperties,
    filters,
    properties,
    users,
    favoriteProperties,
  } from "./store";
  import BuyerForm from "./lib/Buyer/BuyerForm.svelte";
  import BuyersPage from "./lib/Buyers tab/BuyersPage.svelte";
  import PropertyTab from "./lib/Property/PropertyTab.svelte";

  let isDrawing: boolean = false;

  function handleIsDrawingChange(e: CustomEvent<boolean>) {
    isDrawing = e.detail;
  }

  // function applyUserDataToApp(e: CustomEvent<UserData>) {
  //   const userData = e.detail;
  //   console.log(userData);

  //   if (userData.filters) {
  //     filters.set(userData.filters); // ovdje treba vidjet da uvijek vraća objekt
  //   }

  //   favorites = userData.favoriteProperties;
  // }

  let openDialog: DialogType | null = null;

  function setDialog(dialog: DialogType | null) {
    openDialog = dialog;
    console.log(openDialog);
  }
</script>

<Dialog
  title="Spremi novog kupca"
  isOpen={openDialog === "saveBuyer"}
  beforeClose={() => {
    openDialog = null;
  }}
>
  <BuyerForm />
</Dialog>

<main>
  <Header on:isDrawingChange={handleIsDrawingChange} />

  <div class="content">
    {#if $activeTab === "Map"}
      <Map {isDrawing} />
    {:else if $activeTab === "Properties"}
      <PropertyTab />
    {:else if $activeTab === "Buyers"}
      <BuyersPage {setDialog} />
    {/if}
  </div>
</main>

<style>
  main {
    height: 100vh;

    display: flex;
    flex-direction: column;
  }

  .content {
    height: 100%;
    width: 100%;
  }
</style>
