<script lang="ts">
  import type { Property } from "../../types";
  import InternetIcon from "../../assets/icons/InternetIcon.svelte";
  import StarIcon from "../../assets/icons/StarIcon.svelte";
  import { filtersStore } from "../../lib/stores/filtersStore.svelte";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  let isFavorite = $derived(filtersStore.isFavoriteProperty(property.id));

  function handleFavoriteClick() {
    if (isFavorite) {
      filtersStore.removeFavoriteProperty(property.id);
    } else {
      filtersStore.addFavoriteProperty(property.id);
    }
  }
  function handleWebsiteClick() {
    if (property.websiteUrl) window.open(property.websiteUrl, "_blank");
  }
</script>

<div class="property-action-buttons">
  <!-- Favorite button -->
  <button
    type="button"
    style:background-color={isFavorite ? "#d98803" : undefined}
    onclick={(e) => {
      e.stopPropagation();
      handleFavoriteClick();
    }}
  >
    <StarIcon size={20} color="#fff" />
  </button>

  <!-- WebsiteURL button -->
  <button
    type="button"
    disabled={!property.websiteUrl}
    onclick={(e) => {
      e.stopPropagation();
      handleWebsiteClick();
    }}
  >
    <InternetIcon size={20} color="#fff" />
  </button>
</div>

<style>
  .property-action-buttons {
    flex: 0;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }
  .property-action-buttons button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2rem;
    height: 2rem;
    background-color: #0b5eda;
    border-radius: 0.25rem;

    transition: background-color 100ms ease-out;
  }
  .property-action-buttons button:hover {
    background-color: hsl(216, 90%, 35%);
  }

  .property-action-buttons button:disabled {
    background-color: hsl(0, 0%, 70%);
    cursor: not-allowed;
  }
</style>
