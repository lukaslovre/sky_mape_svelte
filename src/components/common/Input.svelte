<script lang="ts">
  import Label from "./Label.svelte";

  export let label: string;
  export let id: string;
  export let value: any;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let error: string | null = null;
</script>

<div class="input">
  <Label forId={id} text={`${required ? "*" : ""} ${label}`} />
  {#if error}
    <p class="error">{error}</p>
  {/if}

  <input
    type="text"
    name={id}
    {id}
    bind:value
    {disabled}
    class:disabled
    autocomplete="off"
  />
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  input {
    position: relative;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;

    /* outline: 2px solid transparent; */
    outline: none;
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
    /* outline: 2px solid #0d65d9; */
    box-shadow:
      /* 0 2px 1px rgba(0, 0, 0, 0.1), */ 0 0 0 2px #0d65d9;
    z-index: 1;
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }
</style>
