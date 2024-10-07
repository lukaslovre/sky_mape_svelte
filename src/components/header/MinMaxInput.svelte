<script lang="ts">
  import Label from "../common/Label.svelte";

  export let label: string;
  export let id: string;
  export let minValue: number;
  export let maxValue: number;
</script>

<div class="min-max-input">
  <Label forId={`${id}-min`} text={label} />

  <div class="inputsContainer">
    <input type="text" name={id + "-min"} id={id + "-min"} bind:value={minValue} />
    <input type="text" name={id + "-max"} id={id + "-max"} bind:value={maxValue} />
  </div>
</div>

<style>
  .min-max-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /* width: fit-content; */
  }

  .inputsContainer {
    display: flex;
  }

  input {
    flex: 1;

    position: relative;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;

    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;

    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  .inputsContainer input:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .inputsContainer input:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  input:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  input:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
