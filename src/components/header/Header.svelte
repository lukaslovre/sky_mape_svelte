<script lang="ts">
  import { uiStateStore } from "../../stores/uiStateStore.svelte";
  import AuthRow from "../auth/AuthRow.svelte";
  import PropertiesInSidebar from "../propertiesInSidebar/PropertiesInSidebar.svelte";
  import FiltersContainer from "./FiltersContainer.svelte";

  const feedbackEmail = "lovretic2002@gmail.com";
  const docLink =
    "https://docs.google.com/document/d/1kUdQpw3vukVma3I58J0qT-dN85amSR8JU_UItpwqRDM/edit?usp=sharing";
</script>

<header>
  <div class="auth-feedback-container">
    <AuthRow />

    <div class="feedback-container">
      <p class="feedback-text">Feedback: {feedbackEmail}</p>
      <a class="feedback-text feedback-link" href={docLink} target="_blank">
        Upute.docx
      </a>
    </div>
  </div>

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
    background-color: hsl(214, 89%, 92%);
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
</style>
