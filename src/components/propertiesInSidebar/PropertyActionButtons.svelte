<script lang="ts">
  import { stopPropagation } from 'svelte/legacy';

  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import InternetIcon from "../../assets/icons/InternetIcon.svelte";
  import StarIcon from "../../assets/icons/StarIcon.svelte";
  import { toggleFavorite } from "../../stores/actions";
  import { favoriteProperties } from "../../stores/store";
  import type { Property } from "../../types";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  //   Temporary for development
  let isFavorite = $derived($favoriteProperties.includes(property.id));

  function handleEditClick() {
    console.log("Edit button clicked");
  }
  function handleFavoriteClick() {
    toggleFavorite(property.id);
  }
  function handleWebsiteClick() {
    if (property.websiteUrl) window.open(property.websiteUrl, "_blank");
  }
</script>

<div class="property-action-buttons">
  <button type="button" onclick={stopPropagation(handleEditClick)}>
    <EditIcon size={20} color="#fff" />
  </button>

  <button
    type="button"
    style:background-color={isFavorite ? "#d98803" : undefined}
    onclick={stopPropagation(handleFavoriteClick)}
  >
    <StarIcon size={20} color="#fff" />
  </button>

  <button type="button" onclick={stopPropagation(handleWebsiteClick)}>
    <InternetIcon size={20} color="#fff" />
  </button>
</div>

<style>
  .property-action-buttons {
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
</style>
