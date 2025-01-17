<script lang="ts">
  import ChevronIcon from "../../assets/icons/ChevronIcon.svelte";

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();

  function close() {
    onClose();
  }
</script>

<button class="close-button" onclick={close}>
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
