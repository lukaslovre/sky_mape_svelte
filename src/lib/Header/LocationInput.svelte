<script lang="ts">
  import DrawIcon from "../../assets/icons/DrawIcon.svelte";
  import Label from "../General components/Label.svelte";
  import { isDrawing } from "../../stores/store";

  function handleDrawButtonClick() {
    isDrawing.update((value) => !value);
  }
</script>

<div class="location-input">
  <Label forId="location" text="Lokacija" />
  <button
    type="button"
    class="button"
    class:isDrawing={$isDrawing}
    id="location"
    on:click={handleDrawButtonClick}
    ><DrawIcon />
    {$isDrawing ? "Završi" : "Nacrtaj"}</button
  >
</div>

<style>
  .location-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 2.5rem;
    padding: 0 1.25rem;
    background-color: #fff;
    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    border-radius: 1.25rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: #1a1a1a;

    cursor: pointer;
    transition:
      background-color 75ms ease-out,
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  .button:hover {
    border-color: hsl(0, 0%, 50%);
  }

  .button:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }

  .button.isDrawing {
    animation: pulsate 1s infinite;
    /* outline: 2px solid transparent; */
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
