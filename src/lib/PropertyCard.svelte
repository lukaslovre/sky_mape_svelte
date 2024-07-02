<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import type { Property } from "../types";

  const dispatch = createEventDispatcher();

  export let propertyData: Property;
  export let isFocused: boolean;
  export let isFavorite: boolean;

  function formatPrice(price: number) {
    // format price to have commas every 3 digits
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function toggleFavorite() {
    dispatch("toggleFavorite", propertyData.id);
  }
</script>

<div class="card" transition:fade class:focused={isFocused} class:favorite={isFavorite}>
  <img src={propertyData.popupData.imgUrl} alt="Property thumbnail" />

  <div class="card-right-side">
    <h2>
      {propertyData.popupData.titleContent}
    </h2>
    <div class="price">
      <span>€</span> <span>{formatPrice(propertyData.popupData.price)}</span>
    </div>
    <div class="surface">{propertyData.popupData.surfaceArea} m²</div>

    <div class="actions-container">
      <button type="button" class="favorite-button" on:click={toggleFavorite}
        >Favorite</button
      >
      <button type="button" class="more-info-button">More Info &gt;</button>
    </div>
  </div>
</div>

<style>
  .card {
    display: flex;
    column-gap: 1rem;

    margin-bottom: 1rem;
    padding: 1rem;
    width: 24rem;

    background-color: #fcfcfc;
    border: 1px solid #ededed;
    border-radius: 0.5rem;
    box-shadow: 0 2 0.5rem rgba(0, 0, 0, 0.075);
    outline: 2px solid transparent;

    transition: outline 150ms ease-out;
  }
  .card.focused {
    outline: 2px solid #0d65d9;
  }
  .card.favorite {
    outline: 2px solid #d98803;
  }

  .card img {
    width: 7rem;
    /* height: 5rem; */
    object-fit: cover;
    border-radius: 0.375rem;
  }
  .card .card-right-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 0.5rem;
  }
  .card .card-right-side h2 {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }

  .card .card-right-side .surface {
    font-size: 0.875rem;
  }

  .price {
    padding: 0.25rem 0.5rem;
    background-color: hsla(216, 90%, 45%, 0.1);
    border-radius: 0.25rem;

    color: #0b5eda;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .actions-container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    border-top: 1px solid #ededed;
    padding-top: 0.5rem;
  }
  .actions-container button {
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
    border: none;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.075);
    background-color: transparent;

    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
  }
  .actions-container button.favorite-button {
    color: #d98803;
    background-color: hsla(37, 97%, 43%, 0.1);
    transition: background-color 150ms ease-out;
  }
  .card.favorite .actions-container button.favorite-button {
    color: white;
    background-color: #d98803;
  }

  .actions-container button.more-info-button {
    color: #0b5eda;
    /* background-color: hsla(216, 90%, 45%, 0.1); */
    box-shadow: none;
    font-size: 0.875rem;
  }
</style>
