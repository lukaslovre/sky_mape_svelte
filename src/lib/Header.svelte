<script lang="ts">
  import FiltersContainer from "./Header/FiltersContainer.svelte";
  import TabMenu from "./Header/TabMenu.svelte";
</script>

<header>
  <div class="max-width-div">
    <FiltersContainer on:isDrawingChange />

    <TabMenu />
  </div>
</header>

<style>
  header {
    z-index: 402;
    flex-shrink: 0;

    display: flex;
    justify-content: center;

    background-color: #f2f2f2;
    padding: 1.5rem 2rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.4);
  }

  .max-width-div {
    flex: 1;
    max-width: 125rem;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
