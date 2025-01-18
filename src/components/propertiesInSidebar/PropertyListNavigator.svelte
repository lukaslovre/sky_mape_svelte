<script lang="ts">
  import ArrowButton from "./ArrowButton.svelte";

  interface Props {
    currentIndex: number;
    totalPropertiesCount: number;
    cycleThruPropertiesBy: (steps: number) => void;
  }

  let { currentIndex, totalPropertiesCount, cycleThruPropertiesBy }: Props = $props();

  function handleNavigation(direction: "next" | "previous") {
    if (totalPropertiesCount === 0) return;

    if (direction === "next") {
      cycleThruPropertiesBy(1);
    } else {
      cycleThruPropertiesBy(-1);
    }
  }
</script>

<div class="property-list-navigator">
  <ArrowButton direction="left" onClick={() => handleNavigation("previous")} />
  <p>{currentIndex + 1}/{totalPropertiesCount}</p>
  <ArrowButton direction="right" onClick={() => handleNavigation("next")} />
</div>

<style>
  .property-list-navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .property-list-navigator p {
    color: #1a1a1a;
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
