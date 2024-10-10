<script lang="ts">
  export let label: string;
  export let id: string;
  export let checked: boolean;
  export let required: boolean = false;
  export let error: string | null = null;
</script>

<div class="checkbox">
  <input type="checkbox" {id} bind:checked />
  <label for={id}>{`${required ? "*" : ""} ${label}`}</label>
  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<style>
  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #808080;
    border-radius: 0.25rem;
    cursor: pointer;
    position: relative;
    transition:
      background-color 0.2s,
      border-color 0.2s;
  }
  input[type="checkbox"]:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: 0.5rem;
    width: 0.3rem;
    height: 0.6rem;
    border: solid white;
    border-width: 0 0.125rem 0.125rem 0;
    transform: rotate(45deg);
  }

  /* Disabled State */
  input[type="checkbox"]:disabled {
    background-color: #e9ecef;
    border-color: #ced4da;
    cursor: not-allowed;
  }

  label {
    cursor: pointer;
    user-select: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a1a;
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }
</style>
