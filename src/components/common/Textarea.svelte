<script lang="ts">
  import Label from "./Label.svelte";

  export let label: string;
  export let id: string;
  export let value: string;
  export let required: boolean = false;
</script>

<div class="textarea">
  <Label forId={id} text={`${required ? "*" : ""} ${label}`} />
  <textarea {id} name={id} bind:value></textarea>
</div>

<style>
  .textarea {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  textarea {
    position: relative;
    width: 100%;
    min-height: 7rem;
    padding: 0.75rem 1rem;

    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;

    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.5;

    resize: vertical;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  textarea:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  textarea:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
