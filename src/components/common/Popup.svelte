<script lang="ts">
  interface Props {
    screenLocation?: [number, number];
    children?: import('svelte').Snippet;
  }

  let { screenLocation = [100, 100], children }: Props = $props();
</script>

<div class="popup" style="top: {screenLocation[1]}px; left: {screenLocation[0]}px;">
  <div class="popup-content">
    {#if children}{@render children()}{:else}
      <!-- Default content -->
      <p>Default content</p>
    {/if}
  </div>
</div>

<style>
  .popup {
    /* position: absolute; */
    /* How can i get absolute position of the whole screen, not from the first parent with "relative" position? */
    position: fixed;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.85);
    color: white;
    font-size: 0.875rem;
    line-height: 1.75;
    padding: 0.875rem;
    border-radius: 0.5rem;
    pointer-events: none; /* Prevents the popup from interfering with mouse events */
    /* Adjusts the position to be above the target */
    transform: translate(-100%, -100%);
    width: max-content;
    max-width: 50vw;
    white-space: pre;
  }
</style>
