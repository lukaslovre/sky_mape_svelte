<script lang="ts">
  import TrashIcon from "../../../assets/icons/TrashIcon.svelte";
  import { removePolygon } from "../../../stores/actions";
  import type { Filters } from "../../../types";
  import PolygonThumbnail from "./PolygonThumbnail.svelte";

  interface Props {
    polygons?: Filters["polygons"];
  }

  let { polygons = [] }: Props = $props();

  //   Event handlers
  function deletePolygon(polygon: Filters["polygons"][0]) {
    console.log("Deleting polygon", polygon);
    removePolygon(polygon);
  }

  let isHovering = $state(false);
</script>

{#if polygons.length !== 0}
  <div class="drawn-polygons-list">
    <ul>
      {#each polygons as polygon, index}
        <li>
          <!-- Polygon Thumbnail -->
          <PolygonThumbnail {polygon} />

          <!-- Edit Button -->
          <!-- <button on:click={() => editPolygon(polygon)}>Uredi</button> -->

          <!-- Delete Button -->
          <button
            onclick={() => deletePolygon(polygon)}
            onmouseenter={() => {
              isHovering = true;
            }}
            onmouseleave={() => {
              isHovering = false;
            }}
          >
            <TrashIcon size={24} color={isHovering ? "#FF0000" : "#808080"} />
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .drawn-polygons-list {
    position: absolute;
    z-index: 401;
    top: 1rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(16px);
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  .drawn-polygons-list ul {
    list-style: none;

    display: flex;
    /* flex-direction: column; */
    gap: 1rem;
    justify-content: flex-end;
    flex-wrap: wrap;
    max-width: 50vw;
  }

  .drawn-polygons-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    /* height: 2.5rem; */
    padding: 0.5rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
  }

  .drawn-polygons-list button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease-out;
  }

  .drawn-polygons-list button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
</style>
