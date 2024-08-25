<script lang="ts">
  export let label: string;
  export let id: string;
  export let minValue: number;
  export let maxValue: number;
</script>

<div class="min-max-input">
  <label for={id}>{label}</label>

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

    max-width: 20rem;
  }

  label {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .inputsContainer {
    display: flex;
  }

  input {
    position: relative;
    width: 100%;
    flex: 1;

    /* width: 100%; */
    /* display: flex;
    align-items: center;
    justify-content: flex-start; */
    padding: 0 1rem;

    height: 2.5rem;
    outline: 1px solid transparent;
    border: 1px solid #e6e6e6;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    font-size: 0.875rem;
    color: #1a1a1a;
    font-weight: 400;

    transition: outline 75ms ease-out;
  }

  .inputsContainer input:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  .inputsContainer input:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }

  input:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
