<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<h1>
  {@render children?.()}
</h1>

<style>
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
  }
</style>
