<script lang="ts">
  import ChevronIcon from "../../assets/icons/ChevronIcon.svelte";

  interface Props {
    text?: string;
    onClose: () => void;
  }

  let { text = "Zatvori", onClose }: Props = $props();

  function close() {
    onClose();
  }
</script>

<button class="close-button" onclick={close}>
  <ChevronIcon size={32} color="#0B5EDA" rotation={180} />
  <span>{text}</span>
</button>

<style>
  .close-button {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    width: fit-content;
    padding: 0.25rem 0.75rem 0.25rem 0;
    border-radius: 0.25rem;
    background-color: hsla(216, 90%, 45%, 0);
    transition: background-color 150ms ease-out;
  }
  .close-button:hover {
    background-color: hsla(216, 90%, 45%, 0.1);
  }
  .close-button span {
    font-size: 0.875rem;
    font-weight: 700;
    color: hsl(216, 90%, 45%);
  }
</style>
