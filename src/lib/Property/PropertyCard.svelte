<script lang="ts">
  import type { Property } from "../../types";
  import EuroIcon from "../../assets/icons/EuroIcon.svelte";
  import LocationIcon from "../../assets/icons/LocationIcon.svelte";
  import SurfaceIcon from "../../assets/icons/SurfaceIcon.svelte";
  import { formatWithCommas } from "../../utils/numbers";
  import PropertyCardLeftSide from "./PropertyCard/PropertyCardLeftSide.svelte";
  import PeopleIcon from "../../assets/icons/PeopleIcon.svelte";
  import HouseIcon from "../../assets/icons/HouseIcon.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let property: Property;
</script>

<div class="property-card">
  <PropertyCardLeftSide {property} />
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

    <button
      class="content-row"
      on:click={() => {
        dispatch("openSideNote", {
          title: "Bilješke nekretnine",
          value: property.propertyNotes,
        });
      }}
    >
      <HouseIcon size={16} color="#1A1A1A" />
      <p>Bilješke nekretnine</p>
    </button>

    <button
      class="content-row"
      on:click={() => {
        dispatch("openSideNote", {
          title: "Bilješke vlasnika",
          value: property.sellerNotes,
        });
      }}
    >
      <PeopleIcon size={16} color="#1A1A1A" />
      <p>Bilješke vlasnika</p>
    </button>

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
