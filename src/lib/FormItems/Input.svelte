<script lang="ts">
  import Label from "../General components/Label.svelte";

  export let label: string;
  export let id: string;
  export let value: string;
</script>

<div class="input">
  <Label forId={id} text={label} />

  <input type="text" name={id} {id} bind:value />
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input {
    position: relative;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;

    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;

    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  input:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  input:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
