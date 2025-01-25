<script lang="ts">
  import type { Property } from "../../types";
  import PropertyCardLeftSide from "./PropertyCardLeftSide.svelte";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();
</script>

<div class="property-card">
  <PropertyCardLeftSide {property} />
</div>

<style>
  .property-card {
    display: flex;
    border-radius: 0.5rem;
    background-color: #fff;

    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  }
</style>
