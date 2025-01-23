<script lang="ts">
  interface Props {
    label: string;
    hue: number;
  }

  let { label, hue }: Props = $props();
</script>

<span
  class="tag"
  style:background-color={`hsl(${hue}, 100%, 90%)`}
  style:color={`hsl(${hue}, 100%, 10%)`}
>
  {label}
</span>

<style>
  .tag {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;

    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
