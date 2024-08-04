<script lang="ts">
  import type { Property } from "../../types";
  import EuroIcon from "../../assets/icons/EuroIcon.svelte";
  import LocationIcon from "../../assets/icons/LocationIcon.svelte";
  import StarIcon from "../../assets/icons/StarIcon.svelte";
  import SurfaceIcon from "../../assets/icons/SurfaceIcon.svelte";
  import InternetIcon from "../../assets/icons/InternetIcon.svelte";
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import { formatWithCommas } from "../../utils/numbers";
  import { favoriteProperties } from "../../store";
  import EyeIcon from "../../assets/icons/EyeIcon.svelte";
  import EyeOffIcon from "../../assets/icons/EyeOffIcon.svelte";

  export let property: Property;

  $: isFavorite = $favoriteProperties.includes(property.id);

  function toggleFavorite() {
    if ($favoriteProperties.includes(property.id)) {
      favoriteProperties.update((prev) => prev.filter((id) => id !== property.id));
    } else {
      favoriteProperties.update((prev) => [...prev, property.id]);
    }
  }
</script>

<div class="property-card">
  <div class="property-card-image">
    <img src={property.imgUrl[0] || null} alt={property.imgUrl[0] || "nothing"} />

    <!-- buttons over image -->
    <div class="buttons-over-image-container">
      <button
        type="button"
        on:click|stopPropagation={() => {
          console.log("clicked on the map button");
        }}
      >
        <EditIcon size={20} />
      </button>

      <button
        type="button"
        style:background-color={isFavorite ? "#d98803" : undefined}
        on:click|stopPropagation={toggleFavorite}
      >
        <StarIcon color="#fff" />
      </button>

      <button
        type="button"
        on:click|stopPropagation={() => {
          console.log("clicked on the map button");
        }}
      >
        <InternetIcon size={20} />
      </button>
    </div>
  </div>
  <div class="property-card-content">
    <div class="content-row">
      <SurfaceIcon />
      <p>{property.type}</p>
    </div>

    <div class="content-row">
      <EuroIcon />
      <p>
        {`${formatWithCommas(property.price)} ${property.action === "Rent" ? "/ mj." : ""}`}
      </p>
    </div>

    <div class="content-row">
      <SurfaceIcon />
      <p>{`${formatWithCommas(property.surfaceArea)} m²`}</p>
    </div>

    <div class="content-row">
      {#if property.hiddenOnWebsite === true}
        <EyeOffIcon size={16} />
        <p>Hidden</p>
      {:else}
        <EyeIcon size={16} />
        <p>Visible</p>
      {/if}
    </div>

    <div class="content-row">
      <LocationIcon />
      <button type="button" class="location-text-button">
        {property.lat.toFixed(2) + ", " + property.lng.toFixed(2)}
      </button>
    </div>
  </div>
</div>

<style>
  .property-card {
    display: flex;
    border-radius: 0.5rem;
    background-color: #fff;

    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.125);
  }

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
    background-color: rgba(0, 0, 0, 0.1);

    border-radius: 0.5rem 0 0 0.5rem;
  }
  .property-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem 0 0 0.5rem;
  }

  .property-card-image .buttons-over-image-container {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    padding: 0.5rem;

    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
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

  .property-card-content {
    flex: 1;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .property-card-content .content-row {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  .property-card-content p {
    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;
  }

  .location-text-button {
    /* remove default button styles */
    background: none;
    border: none;
    padding: 0;

    font-size: 0.875rem;
    font-weight: 400;
    color: #0b5eda;
    /* text-decoration: underline; */

    cursor: pointer;
  }
</style>
