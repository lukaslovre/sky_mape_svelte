<script lang="ts">
  import FiltersContainer from "./header/FiltersContainer.svelte";
  import TabMenu from "./header/TabMenu.svelte";
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
    padding: 1.5rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.4);
  }

  .max-width-div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    max-width: 80rem;
  }

  /* .top-row {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
  }
  .top-row > div {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
  } */

  .upper-row {
    display: flex;
    gap: 1rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 2.5rem;
    padding: 0 1rem;
    background-color: #0d65d9;
    border: 1px solid transparent;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      background-color 75ms ease-out,
      outline 75ms ease-out;
  }

  button:hover {
    background-color: #0b5eda;
  }
  button:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
