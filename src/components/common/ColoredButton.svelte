<!-- A button svelte component -->

<script lang="ts">

  interface Props {
    text: string;
    color?: string;
    onClick?: (e: MouseEvent) => void;
    children?: import('svelte').Snippet;
  }

  let {
    text,
    color = "#1a1a1a",
    onClick = () => {},
    children
  }: Props = $props();
</script>

<button
  class="colored-button"
  onclick={onClick}
  style="--button-color: {color}; --button-color-ten-percent: {color}1a; --button-color-twenty-percent: {color}33;"
>
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
    width: fit-content;
    padding: 0 1.25rem;
    border-radius: 0.25rem;
    background-color: var(--button-color-ten-percent, hsla(0, 100%, 100%, 0.1));
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);

    font-size: 1rem;
    font-weight: 600;
    color: var(--button-color, hsla(0, 100%, 100%, 0.1));

    transition:
      background-color 150ms ease-out,
      transform 150ms ease-out;
  }

  button:hover {
    background-color: var(--button-color-twenty-percent, hsla(0, 100%, 100%, 0.2));
  }

  button:active {
    transform: scale(0.95);
  }
</style>
