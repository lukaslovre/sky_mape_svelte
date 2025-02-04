<script lang="ts">
  interface Props {
    forId?: string;
    text: string;
  }

  let { forId, text }: Props = $props();
</script>

{#if forId}
  <label for={forId}>{text}</label>
{:else}
  <p>{text}</p>
{/if}

<style>
  label,
  p {
    color: hsl(0, 0%, 25%);
    font-size: 0.75rem;
    font-weight: 500;
  }
</style>
