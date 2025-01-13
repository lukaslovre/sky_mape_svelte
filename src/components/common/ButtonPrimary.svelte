<!-- A button svelte component -->

<script lang="ts">

  interface Props {
    text: string;
    onClick?: (e: MouseEvent) => void;
    children?: import('svelte').Snippet;
  }

  let { text, onClick = () => {}, children }: Props = $props();
</script>

<button class="primary-button" onclick={onClick}>
  {@render children?.()}
  {text}
</button>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 2.5rem;
    width: 100%;
    padding: 0 1.25rem;
    border-radius: 0.25rem;
    background-color: #0d65d9;
    border: 1px solid transparent;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);

    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;

    transition:
      background-color 75ms ease-out,
      transform 75ms ease-out;
  }

  button:hover {
    background-color: #0b5eda;
  }

  button:active {
    transform: scale(0.95);
  }
</style>
