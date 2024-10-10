<script lang="ts">
  import Label from "./Label.svelte";

  export let label: string;
  export let id: string;
  export let value: File | null = null;
  export let required: boolean = false;

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      value = target.files[0];
    } else {
      value = null;
    }
  }
</script>

<div class="image-input">
  <Label forId={id} text={`${required ? "*" : ""} ${label}`} />

  <input
    type="file"
    accept="image/*"
    name={id}
    {id}
    on:change={handleFileChange}
    {required}
  />

  {#if value}
    <p>Selected file: {value.name}</p>
  {/if}
</div>

<style>
  .image-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input[type="file"] {
    position: relative;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    font-size: 0.875rem;
    color: #1a1a1a;
    transition:
      border 75ms ease-out,
      box-shadow 75ms ease-out;
  }

  input[type="file"]:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  input[type="file"]:focus {
    box-shadow: 0 0 0 2px #0d65d9;
    outline: none;
    z-index: 1;
  }
</style>
