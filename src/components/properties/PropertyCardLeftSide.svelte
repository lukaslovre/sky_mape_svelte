<script lang="ts">
  import { stopPropagation } from "svelte/legacy";

  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import EyeOffIcon from "../../assets/icons/EyeOffIcon.svelte";
  import InternetIcon from "../../assets/icons/InternetIcon.svelte";
  import StarIcon from "../../assets/icons/StarIcon.svelte";
  import { pocketbaseUrl } from "../../PocketBaseInit";
  import { dataStore } from "../../stores/store.svelte";
  import type { Property } from "../../types";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  let isFavorite = $derived(dataStore.favoriteProperties.includes(property.id));

  function toggleFavorite() {
    dataStore.favoriteProperties.includes(property.id)
      ? (dataStore.favoriteProperties = dataStore.favoriteProperties.filter(
          (id) => id !== property.id
        ))
      : dataStore.favoriteProperties.push(property.id);
  }

  function openPropertyEditor() {
    const url = getPocketbaseRecordUrl();

    console.log("openPropertyEditor", url);

    // propertyFormStore.setFieldValues(property);

    // window.open(url, "_blank");
  }

  function getPocketbaseRecordUrl() {
    // http://49.13.64.0:9992/_/#/collections?collectionId=1xq5g1wyjzp8jk7&filter=&sort=-created&recordId=2zbtkfe3chmp6ta
    const { collectionId, id } = property;

    const baseUrl = `${pocketbaseUrl}/_/#/collections`;

    const queryParams = new URLSearchParams({
      collectionId,
      recordId: id,
    });

    return `${baseUrl}?${queryParams.toString()}`;
  }
</script>

<div class="property-card-image">
  <img src={property.imgUrl[0] || null} alt={property.imgUrl[0] || "nothing"} />

  <!-- visibility overlay -->
  <div class="visibility-overlay" class:property-is-hidden={property.hiddenOnWebsite}>
    <EyeOffIcon size={20} color="#fff" />
    <p>Hidden</p>
  </div>

  <!-- buttons over image -->
  <div class="buttons-over-image-container">
    <button type="button" onclick={stopPropagation(openPropertyEditor)}>
      <EditIcon size={20} />
    </button>

    <button
      type="button"
      style:background-color={isFavorite ? "#d98803" : undefined}
      onclick={stopPropagation(toggleFavorite)}
    >
      <StarIcon color="#fff" />
    </button>

    <button
      type="button"
      onclick={stopPropagation(() => {
        console.log("clicked on the internet button");
      })}
    >
      <InternetIcon size={20} />
    </button>
  </div>
</div>

<style>
  .property-card-image {
    flex-shrink: 0;

    width: 10rem;
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

    border-radius: 0.5rem 0 0 0.5rem;
  }
  .property-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem 0 0 0.5rem;
  }

  .property-card-image .visibility-overlay {
    display: none;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.25rem 0;

    color: #fff;
    font-size: 0.875rem;
    font-weight: 400;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem 0 0 0;

    /* background blur */
    backdrop-filter: blur(0.5rem);
  }
  .visibility-overlay.property-is-hidden {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .property-card-image .buttons-over-image-container {
    opacity: 0.25;

    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    padding: 0.5rem;

    display: flex;
    gap: 0.5rem;
    justify-content: space-between;

    transition: opacity 75ms ease-out;
  }
  .property-card-image:hover .buttons-over-image-container {
    opacity: 1;
  }

  .property-card-image .buttons-over-image-container button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2rem;
    height: 2rem;
    background-color: #0b5eda;
    border-radius: 0.5rem;
  }
</style>
