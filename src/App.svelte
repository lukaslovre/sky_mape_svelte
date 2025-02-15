<script lang="ts">
  import Header from "./components/header/Header.svelte";
  import Map from "./components/pages/Map.svelte";
  import PropertyPage from "./components/pages/PropertyPage.svelte";
  import ClientsPage from "./components/pages/ClientsPage.svelte";
  import OwnersPage from "./components/pages/OwnersPage.svelte";
  import TabMenu from "./components/header/TabMenu.svelte";
  import { uiStateStore } from "./lib/stores/uiStateStore.svelte";
</script>

<main>
  <Header />

  <div class="content">
    <TabMenu />

    {#if uiStateStore.activeTab === "Map"}
      <Map />
    {:else if uiStateStore.activeTab === "Properties"}
      <PropertyPage />
    {:else if uiStateStore.activeTab === "Buyers"}
      <ClientsPage />
    {:else if uiStateStore.activeTab === "Owners"}
      <OwnersPage />
    {/if}
  </div>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
  }

  .content {
    height: 100vh;
    width: 100%;
    overflow-y: auto;

    position: relative;
  }
</style>
