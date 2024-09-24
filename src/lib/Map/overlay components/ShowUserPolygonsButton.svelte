<script lang="ts">
  export let userPolygonsVisibility: boolean;
  export let toggleUserPolygonsVisibility: () => void;

  function onClick() {
    toggleUserPolygonsVisibility();
  }
</script>

<button on:click={onClick} class:active={userPolygonsVisibility}>Pokaži poligone</button>

<style>
  button {
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
    outline: 0px solid transparent;

    font-weight: 600;
    font-size: 0.875rem;

    transition:
      background-color 0.1s ease-out,
      color 0.1s ease-out,
      outline 0.1s ease-out;
  }
  button.active {
    background-color: #f0f0f0;
    color: #333;
    outline: 1px solid #333;
  }
</style>
