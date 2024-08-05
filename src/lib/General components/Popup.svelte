<script lang="ts">
  export let screenLocation: [number, number] = [100, 100];
</script>

<div class="popup" style="top: {screenLocation[1]}px; left: {screenLocation[0]}px;">
  <div class="popup-content">
    <slot>
      <!-- Default content -->
      <p>Default content</p>
    </slot>
  </div>
</div>

<style>
  .popup {
    position: absolute;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    pointer-events: none; /* Prevents the popup from interfering with mouse events */
    transform: translate(-100%, -100%); /* Adjusts the position to be above the target */
    width: max-content;
    max-width: 50vw;
    white-space: pre;
  }
</style>
