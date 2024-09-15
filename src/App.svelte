<script lang="ts">
  import type { DialogType } from "./types";
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";

  import Dialog from "./lib/General components/Dialog.svelte";

  import { activeTab } from "./store";
  import BuyerForm from "./lib/Buyer/BuyerForm.svelte";
  import BuyersPage from "./lib/Buyer/BuyersPage.svelte";
  import PropertyPage from "./lib/Property/PropertyPage.svelte";
  import SideNote from "./lib/General components/SideNote.svelte";

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
    <SideNote
      title="Side note title"
      value={`# Seller Details:
Name
Contact information (phone number, email)
Preferred contact method and times

# Seller's Selling Conditions:
Minimum acceptable price
Preferred selling timeline
Any specific conditions or contingencies (e.g., seller needs to find a new home first)

# Seller's Motivation:
Reason for potential sale (downsizing, relocating, investment, etc.)
Level of urgency (high, medium, low)`}
    />

    {#if $activeTab === "Map"}
      <Map {isDrawing} />
    {:else if $activeTab === "Properties"}
      <PropertyPage />
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

    position: relative;
  }
</style>
