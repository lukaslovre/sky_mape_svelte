<script lang="ts">
  interface Props {
    label: string;
    value: string;
    isUndefined?: boolean;
  }

  let { label, value, isUndefined = false }: Props = $props();

  type Value = {
    type: "p" | "h1";
    value: string;
  };

  let valuesArray: Value[] = $derived(
    value.split("\n").map((line) => {
      if (line.startsWith("# ")) return { type: "h1", value: line.slice(2) };
      else return { type: "p", value: line };
    })
  );
</script>

<div class="info-row" class:is-undefined={isUndefined}>
  <p class="info-label">{label}</p>

  {#each valuesArray as { type, value }}
    {#if type === "h1"}
      <p class="info-value h1">{value}</p>
    {:else}
      <p class="info-value p">{value}</p>
    {/if}
  {/each}
</div>

<style>
  .info-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    line-height: 150%;
  }
  .info-row.is-undefined {
    opacity: 0.25;
  }

  /* .info-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(0, 0%, 10%);
  }
  .info-value.h1 {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(0, 0%, 15%);
  } 
  .info-value.p {
    font-size: 0.875rem;
    font-weight: 400;
    color: hsl(0, 0%, 20%);
  } */

  .info-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(0, 0%, 40%);
  }
  .info-value.h1 {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(0, 0%, 10%);
  }
  .info-value.p {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(0, 0%, 20%);
  }
</style>
