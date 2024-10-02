<script lang="ts">
  import type { DialogType } from "./types";
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
  import Dialog from "./lib/General components/Dialog.svelte";
  import { activeTab } from "./stores/store";
  import BuyerForm from "./lib/Buyer/BuyerForm.svelte";
  import BuyersPage from "./lib/Buyer/BuyersPage.svelte";
  import PropertyPage from "./lib/Property/PropertyPage.svelte";
  import SideNote from "./lib/General components/SideNote.svelte";
  import PropertyForm from "./lib/Property/PropertyForm.svelte";
  import OwnersPage from "./lib/Owners/OwnersPage.svelte";
  import InteractionsPage from "./lib/Interactions/InteractionsPage.svelte";
  import AuthRow from "./lib/AuthRow/AuthRow.svelte";

  // Dialog
  let openDialog: DialogType | null = null;
  function setDialog(dialog: DialogType | null) {
    openDialog = dialog;
    console.log(openDialog);
  }

  // SideNote
  type SideNoteParams = {
    title: string;
    value: string;
  };
  let openSideNote: SideNoteParams | null = null;
  function setSideNote(params: SideNoteParams) {
    openSideNote = params;
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
  <AuthRow />

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

    {#if $activeTab === "Map"}
      <Map
        on:openSideNote={(e) => {
          setSideNote(e.detail);
        }}
      />
    {:else if $activeTab === "Properties"}
      <PropertyPage
        {setDialog}
        on:openSideNote={(e) => {
          setSideNote(e.detail);
        }}
      />
    {:else if $activeTab === "Buyers"}
      <BuyersPage {setDialog} />
    {:else if $activeTab === "Owners"}
      <OwnersPage {setDialog} />
    {:else if $activeTab === "Interactions"}
      <InteractionsPage {setDialog} />
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
