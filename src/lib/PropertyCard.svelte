<script lang="ts">
  import { fade } from "svelte/transition";

  export let isFocused: boolean;
  export let setFocusedProperty;

  export let propertyData: {
    popupData: {
      imgUrl: string;
      titleContent: string;
      descriptionContent: string;
      linkValue: string;
      surfaceArea: number;
      price: number;
    };
    latlng: number[];
    type: string;
  };

  function formatPrice(price: number) {
    // format price to have commas every 3 digits
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>

<div class="card" transition:fade class:focused={isFocused}>
  <img src={propertyData.popupData.imgUrl} alt="Property Image" />

  <div class="card-right-side">
    <h2
      on:click={() => {
        setFocusedProperty(propertyData.popupData.titleContent);
      }}
    >
      {propertyData.popupData.titleContent}
    </h2>
    <div class="price">
      <span>€</span> <span>{formatPrice(propertyData.popupData.price)}</span>
    </div>
    <div class="surface">{propertyData.popupData.surfaceArea} m²</div>

    <div class="actions-container">
      <button type="button" class="favorite-button">Favorite</button>
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
  }
  .card.focused {
    outline: 2px solid #0d65d9;
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
  }
  .actions-container button.more-info-button {
    color: #0b5eda;
    /* background-color: hsla(216, 90%, 45%, 0.1); */
    box-shadow: none;
    font-size: 0.875rem;
  }
</style>
