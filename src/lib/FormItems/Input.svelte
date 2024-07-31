<script lang="ts">
  export let label: string;
  export let id: string;
  export let value: string;
</script>

<div class="input">
  <label for={id}>{label}</label>
  <input type="text" name={id} {id} bind:value />
</div>

<style>
  label {
    display: block;
    margin-bottom: 0.5rem;

    color: #262626;
    font-size: 0.875rem;
    font-weight: 600;
  }

  input {
    position: relative;
    width: 100%;

    /* width: 100%; */
    /* display: flex;
      align-items: center;
      justify-content: flex-start; */
    padding: 0 1rem;

    height: 2.5rem;
    outline: 1px solid transparent;
    border: 1px solid #e6e6e6;
    border-radius: 0.25rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    font-size: 0.875rem;
    color: #1a1a1a;
    font-weight: 400;

    transition: outline 75ms ease-out;
  }

  input:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
