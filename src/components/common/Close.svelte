<script>
  import ChevronIcon from "../../assets/icons/ChevronIcon.svelte";
  // event dispatcher
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }
</script>

<button class="close-button" on:click={close}>
  <ChevronIcon size={32} color="#0B5EDA" rotation={180} />
  <span>Zatvori</span>
</button>

<style>
  .close-button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .close-button span {
    font-size: 0.875rem;
    font-weight: 700;
    color: #0b5eda;
  }
</style>
