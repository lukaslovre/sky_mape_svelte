<script lang="ts">
  import AuthRow from "../auth/AuthRow.svelte";
  import FiltersContainer from "./FiltersContainer.svelte";

  // type SidebarTab = "pages" | "filters";

  // let selectedSidebarTab: SidebarTab = "pages";
</script>

<header>
  <div class="auth-feedback-container">
    <AuthRow />

    <div class="feedback-container">
      <p class="feedback-text">Feedback: lovretic2002@gmail.com</p>
      <a
        class="feedback-text feedback-link"
        href="https://docs.google.com/document/d/1kUdQpw3vukVma3I58J0qT-dN85amSR8JU_UItpwqRDM/edit?usp=sharing"
        target="_blank"
      >
        Roadmap docx
      </a>
    </div>
  </div>

  <!-- <div class="sidebar-navigation-container">
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
  </div> -->

  <!-- {#if selectedSidebarTab === "pages"} -->
  <!-- <TabMenu /> -->
  <!-- {:else if selectedSidebarTab === "filters"} -->
  <FiltersContainer />
  <!-- {/if} -->
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

  .auth-feedback-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1.5rem;
  }

  .feedback-container {
    display: flex;
    align-items: start;
    gap: 0.5rem;
  }

  .feedback-text {
    display: block;
    font-size: 0.625rem;
    font-weight: 600;
    color: hsl(214, 89%, 45%);
    background-color: hsl(214, 89%, 95%);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .feedback-link {
    text-decoration: none;

    transition: all 150ms ease-out;
  }

  .feedback-link:hover {
    background-color: hsl(214, 89%, 45%);
    color: hsl(214, 89%, 95%);
  }

  .sidebar-navigation-container {
    display: flex;
    gap: 1rem;
  }
</style>
