<!-- A button svelte component -->

<script lang="ts">
  export let text: string;

  export let onClick: (e: MouseEvent) => void = () => {};
</script>

<button class="secondary-button" on:click={onClick}>
  <slot />
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
    background-color: hsl(0, 0%, 80%);
    /* box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05); */

    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;

    transition:
      background-color 150ms ease-out,
      transform 150ms ease-out;
  }

  button:hover {
    background-color: hsl(0, 0%, 70%);
  }

  button:active {
    transform: scale(0.95);
  }
</style>
