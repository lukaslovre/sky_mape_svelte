<script lang="ts">
  import { removeThumbFromUrl } from "../../../lib/models/Properties";

  interface Props {
    imageUrls: string[];
  }

  let { imageUrls }: Props = $props();

  let fullSizeImageUrls: string[] = $derived(
    imageUrls.map((imageUrl) => removeThumbFromUrl(imageUrl))
  );

  // State to track current active image index
  let currentIndex: number = $state(0);

  function setActiveImage(index: number) {
    if (index < 0 || index >= fullSizeImageUrls.length) {
      return;
    }
    currentIndex = index;
  }
</script>

<div class="thumbnail-container">
  <a href={fullSizeImageUrls[currentIndex]} target="_blank">
    <img
      class="main-image"
      src={imageUrls[currentIndex]}
      alt="Active Property Thumbnail"
    />
  </a>

  {#if imageUrls.length > 1}
    <div class="thumbnails">
      {#each imageUrls as imageUrl, index}
        <button type="button" onclick={() => setActiveImage(index)}>
          <img
            src={imageUrl}
            alt="Property Thumbnail"
            class:selected={index === currentIndex}
          />
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .thumbnail-container {
    width: 100%;
  }
  .main-image {
    display: block;
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.125);
  }

  .thumbnails {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
  }
  .thumbnails button {
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
  }
  .thumbnails img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.375rem;
    border: 2px solid transparent;
  }
  .thumbnails img.selected {
    border-color: #0d65d9;
  }
</style>
