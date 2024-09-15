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
  import PropertyForm from "./lib/Property/PropertyForm.svelte";

  let isDrawing: boolean = false;

  function handleIsDrawingChange(e: CustomEvent<boolean>) {
    isDrawing = e.detail;
  }

  let openDialog: DialogType | null = null;

  function setDialog(dialog: DialogType | null) {
    openDialog = dialog;
    console.log(openDialog);
  }
</script>

<Dialog
  title={openDialog === "saveProperty" ? "Spremi novu nekretninu" : "Spremi novog kupca"}
  isOpen={openDialog !== null}
  beforeClose={() => {
    openDialog = null;
  }}
>
  {#if openDialog === "saveProperty"}
    <PropertyForm />
  {:else if openDialog === "saveBuyer"}
    <BuyerForm />
  {/if}
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
      <PropertyPage {setDialog} />
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
