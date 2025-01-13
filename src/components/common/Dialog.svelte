<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import Header1 from "./Header1.svelte";


  interface Props {
    title?: string;
    beforeClose?: any;
    isOpen?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    title = "Dialog Title",
    beforeClose = () => {},
    isOpen = true,
    children
  }: Props = $props();

  function close() {
    beforeClose();

    // close dialog
    // isOpen = false;
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="backdrop" onclick={close} typeof="button">
    <section class="dialog" onclick={stopPropagation(bubble('click'))}>
      <div class="dialog-header">
        <Header1>{title}</Header1>
        <button onclick={close}>Close</button>
      </div>

      <div class="dialog-content">
        {@render children?.()}
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

    /* max-width: calc(100% - 4rem); */
    min-width: 15rem;
    width: 85%;
    min-height: 10rem;
    height: 80vh;

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

  .dialog-content {
    flex: 1;
    /* height: 100%; */
    overflow-y: auto;
    padding: 0 0.5rem;
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
