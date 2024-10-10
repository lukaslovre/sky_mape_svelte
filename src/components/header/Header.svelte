<script lang="ts">
  import FilterIcon from "../../assets/icons/FilterIcon.svelte";
  import HouseIcon from "../../assets/icons/HouseIcon.svelte";
  import AuthRow from "../auth/AuthRow.svelte";
  import SecondaryButton from "../common/SecondaryButton.svelte";
  import FiltersContainer from "./FiltersContainer.svelte";
  import TabMenu from "./TabMenu.svelte";

  type SidebarTab = "pages" | "filters";

  let selectedSidebarTab: SidebarTab = "pages";
</script>

<header>
  <AuthRow />

  <div class="sidebar-navigation-container">
    <SecondaryButton
      text="Stranice"
      inlineCss="width:100%"
      onClick={() => (selectedSidebarTab = "pages")}
    >
      <HouseIcon size={24} color="#1A1A1A" backgroundColor="hsl(0, 0%, 80%)" />
    </SecondaryButton>
    <SecondaryButton
      text="Filter"
      inlineCss="width:100%"
      onClick={() => (selectedSidebarTab = "filters")}
    >
      <FilterIcon size={24} color="#1A1A1A" />
    </SecondaryButton>
  </div>

  {#if selectedSidebarTab === "pages"}
    <TabMenu />
  {:else if selectedSidebarTab === "filters"}
    <FiltersContainer />
  {/if}
</header>

<style>
  header {
    width: 22rem;
    z-index: 402;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    gap: 3rem;

    overflow-y: auto;

    background-color: #f5f5f5;
    padding: 1.5rem;
    box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.5);
  }

  .sidebar-navigation-container {
    display: flex;
    gap: 1rem;
  }
</style>
