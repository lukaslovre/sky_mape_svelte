<script lang="ts">
  import DrawIcon from "../../assets/icons/DrawIcon.svelte";

  export let isDrawing: boolean;

  function handleDrawButtonClick() {
    isDrawing = !isDrawing;
  }
</script>

<div class="location-input">
  <label for="location">Lokacija</label>
  <button
    type="button"
    class="button"
    class:isDrawing
    id="location"
    on:click={handleDrawButtonClick}
    ><DrawIcon />
    {isDrawing ? "Završi" : "Nacrtaj"}</button
  >
</div>

<style>
  .location-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
    padding-right: 0.5rem;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 2.5rem;
    padding: 0 1rem;
    background-color: #fff;
    border: 1px solid transparent;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #1a1a1a;
    font-weight: 700;

    cursor: pointer;
    transition:
      background-color 75ms ease-out,
      outline 75ms ease-out;
  }

  .button:hover,
  .button:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }

  .button.isDrawing {
    animation: pulsate 1s infinite;
    outline: 2px solid transparent;
  }

  @keyframes pulsate {
    0%,
    100% {
      background-color: hsl(129, 75%, 35%);
    }
    50% {
      background-color: hsl(129, 75%, 50%);
    }
  }
</style>
