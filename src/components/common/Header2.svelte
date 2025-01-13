<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<h2>
  {@render children?.()}
</h2>

<style>
  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;
  }
</style>
