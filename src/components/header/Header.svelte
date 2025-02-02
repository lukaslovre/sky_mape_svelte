<script lang="ts">
  import { uiStateStore } from "../../stores/uiStateStore.svelte";
  import AuthRow from "../auth/AuthRow.svelte";
  import PropertiesInSidebar from "../propertiesInSidebar/PropertiesInSidebar.svelte";
  import FiltersContainer from "./FiltersContainer.svelte";
</script>

<header>
  <AuthRow />

  {#if uiStateStore.selectedSidebarCategory === "filters"}
    <FiltersContainer />
  {:else if uiStateStore.selectedSidebarCategory === "selectedProperty"}
    <PropertiesInSidebar />
  {/if}
</header>

<style>
  header {
    width: 24rem;
    z-index: 402;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    gap: 3rem;

    overflow-y: auto;
    overflow-x: hidden;

    background-color: #f5f5f5;
    padding: 1.5rem;
    box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.5);
  }
</style>
