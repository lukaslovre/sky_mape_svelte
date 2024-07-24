<script lang="ts">
  export let title: string = "Dialog Title";
  export let beforeClose = () => {};

  let open: boolean = true;

  function close() {
    beforeClose();

    // close dialog
    open = false;
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="backdrop" on:click={close} typeof="button">
    <section class="dialog">
      <div class="dialog-header">
        <h2>{title}</h2>
        <button on:click={close}>Close</button>
      </div>
      <div class="dialog-actions">
        <button>Click!</button>
      </div>
      <div class="dialog-content">
        <slot />
      </div>
    </section>
  </div>
{/if}

<style>
  .backdrop {
    z-index: 1001;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
  }

  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: 2rem;

    min-width: 15rem;
    max-width: calc(100% - 4rem);
    width: 50rem;

    background-color: #f7f7f7;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.4);
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dialog-actions {
    display: flex;
    gap: 1rem;
  }

  .dialog-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #1a1a1a;
    font-weight: 600;
  }

  /* temp */
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>
