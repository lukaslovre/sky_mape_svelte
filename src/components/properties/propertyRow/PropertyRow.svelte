<script lang="ts">
  import type { Property } from "../../../types";
  import { getDefaultImageURL } from "../../../utils/image";
  import { getAttributesForProperty } from "../../../utils/properties";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  const defaultImgUrl = getDefaultImageURL();
</script>

<div class="property-row-container">
  <img src={property.imgUrl.at(0) || defaultImgUrl} alt="" />

  <div class="attributes">
    {#each Object.values(getAttributesForProperty(property)) as attribute}
      <span>{attribute}</span>
    {/each}
  </div>
</div>

<style>
  .property-row-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .property-row-container img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .attributes {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .attributes span {
    padding: 0.25rem 0.5rem;
    background-color: hsl(0, 0%, 80%);
    border-radius: 0.5rem;
    font-size: 0.75rem;
    color: hsl(0, 0%, 10%);
    font-weight: 500;
  }
</style>
