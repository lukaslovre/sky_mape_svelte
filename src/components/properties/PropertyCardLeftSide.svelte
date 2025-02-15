<script lang="ts">
  import type { Property } from "../../types";
  import { getDefaultImageURL } from "../../lib/utils/image";
  import { getAttributesForProperty } from "../../lib/utils/properties";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  let tags = $derived(Object.values(getAttributesForProperty(property)));

  const defaultImgUrl = getDefaultImageURL();
</script>

<div class="property-card-image">
  <img
    src={property.imgUrl[0] || defaultImgUrl}
    alt={property.imgUrl[0] || "missing image"}
  />

  <div class="tags-container">
    {#each tags as tag}
      <span class="tag">{tag}</span>
    {/each}
  </div>
</div>

<style>
  .property-card-image {
    flex-shrink: 0;

    width: 12rem;
    height: 10rem;

    position: relative;
  }
  .property-card-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.15) 66%,
      rgba(0, 0, 0, 0.75) 100%
    );

    border-radius: 0.5rem;
  }
  .property-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .property-card-image .tags-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;

    display: flex;
    gap: 0.325rem;
    flex-wrap: wrap;
  }
  .property-card-image .tags-container .tag {
    padding: 0.25rem 0.5rem;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
