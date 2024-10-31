<script lang="ts">
  import ChevronIcon from "../../assets/icons/ChevronIcon.svelte";

  type Direction = "left" | "up" | "right" | "down";
  export let direction: Direction = "right";
  export let onClick: () => void = () => {};

  $: directionInDegrees = {
    left: 180,
    up: 270,
    right: 0,
    down: 90,
  }[direction];
</script>

<button type="button" on:click={onClick}>
  <ChevronIcon size={32} rotation={directionInDegrees} color={"#0B5EDA"} />
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;

    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);

    transition: box-shadow 75ms ease-out;
  }

  button:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
</style>
