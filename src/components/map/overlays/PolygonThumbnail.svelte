<script lang="ts">
  import type { Filter } from "../../../stores/filtersStore.svelte";

  interface Props {
    polygon?: Filter["polygons"][0];
  }

  let { polygon = [] }: Props = $props();

  // Compute normalized SVG path
  let path = $state("");

  $effect(() => {
    if (polygon.length === 0) {
      path = "";
    } else {
      // Extract longitude (x) and latitude (y) coordinates using named properties
      const xs = polygon.map((p) => p.lng);
      const ys = polygon.map((p) => p.lat);

      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const width = maxX - minX;
      const height = maxY - minY;

      const padding = 2;
      const scaleX = (32 - 2 * padding) / width;
      const scaleY = (32 - 2 * padding) / height;
      const scale = Math.min(scaleX, scaleY);

      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      const offsetX = padding + (32 - 2 * padding - scaledWidth) / 2;
      const offsetY = padding + (32 - 2 * padding - scaledHeight) / 2;

      path =
        polygon
          .map((p, index) => {
            // Transform coordinates to SVG space using named properties
            const x = (p.lng - minX) * scale + offsetX;
            const y = (maxY - p.lat) * scale + offsetY; // Invert Y-axis for SVG
            return `${index === 0 ? "M" : "L"}${x} ${y}`;
          })
          .join(" ") + " Z";
    }
  });
</script>

<button
  class="polygon-thumbnail"
  onclick={() => {
    console.log("Clicked on polygon thumbnail");
  }}
>
  <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    {#if path}
      <path
        d={path}
        fill="rgba(0, 120, 255, 0.25)"
        stroke="rgba(0, 120, 255, 1)"
        stroke-width="1"
      />
    {:else}
      <!-- Optionally, display a placeholder or leave empty -->
    {/if}
  </svg>
</button>

<style>
  .polygon-thumbnail {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #fff;

    transition: background-color 150ms ease-out;
  }

  .polygon-thumbnail:hover {
    background-color: hsl(0, 0%, 95%);
    border-radius: 0.25rem;
  }
</style>
