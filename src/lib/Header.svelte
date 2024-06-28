<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BuyerInput from "./header/BuyerInput.svelte";

  const dispatch = createEventDispatcher();

  export let handleDrawButtonClick: () => void;
  export let isDrawing: boolean;

  let type = "";
  let action = "";
  let sizeMin = 0;
  let sizeMax = 0;
  let priceMin = 0;
  let priceMax = 0;

  // If any of the values change, console.log them
  $: {
    const parsedFilters = {
      sizeMin: sizeMin ? sizeMin : 0,
      sizeMax: sizeMax ? sizeMax : Infinity,
      priceMin: priceMin ? priceMin : 0,
      priceMax: priceMax ? priceMax : Infinity,
      type: type ? type.trim() : "",
      action: action ? action.trim() : "",
    };

    dispatch("filterProperties", parsedFilters);
  }
</script>

<header>
  <BuyerInput />

  <form action="#" id="filterHouses">
    <div class="form-items">
      <!-- Vrsta nekretnine -->
      <div class="form-item">
        <label for="type">Tip nekretnine</label>
        <select name="type" id="type" bind:value={type}>
          <option value="">Sve</option>
          <option value="building">Stan</option>
          <option value="house">Kuća</option>
          <option value="business">Poslovni prostor</option>
          <option value="land">Zemljište</option>
        </select>
      </div>

      <!-- Akcija -->
      <div class="form-item">
        <label for="type">Akcije</label>
        <select name="action" id="action" bind:value={action}>
          <option value="">Sve</option>
          <option value="sale">Prodaja</option>
          <option value="rent">Iznajmljivanje</option>
        </select>
      </div>

      <!-- Cijena -->
      <div class="form-item">
        <label for="price">Cijena (€)</label>
        <div class="range">
          <input type="number" id="priceMin" name="priceMin" bind:value={priceMin} />
          <input type="number" id="priceMax" name="priceMax" bind:value={priceMax} />
        </div>
      </div>

      <!-- Kvadratura -->
      <div class="form-item">
        <label for="size">Površina (m²)</label>
        <div class="range">
          <input type="number" id="sizeMin" name="sizeMin" bind:value={sizeMin} />
          <input type="number" id="sizeMax" name="sizeMax" bind:value={sizeMax} />
        </div>
      </div>

      <!-- Lokacija -->
      <div class="form-item">
        <label for="location">Lokacija</label>
        <button
          id="draw-location-button"
          type="button"
          on:click={handleDrawButtonClick}
          class:isDrawing>{isDrawing ? "Završi crtanje" : "Nacrtaj"}</button
        >
      </div>

      <input type="submit" value="Search" />
    </div>
  </form>
</header>

<style>
  header {
    z-index: 401;
    flex-shrink: 0;

    background-color: #f7f7f7;
    padding: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  form .form-items {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
  }
  form .form-items .form-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  form .form-items .form-item label {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
  }
  form .form-items .form-item input,
  form .form-items .form-item select {
    padding: 0.75rem 1rem;
    width: 100%;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    outline: 1px solid transparent;
    border: none;
    background-color: #ffffff;
    border: 1px solid #e6e6e6;
    transition: outline 75ms ease-out;
  }
  form .form-items .form-item input:focus,
  form .form-items .form-item select:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
  form .form-items .form-item .range {
    display: flex;
  }
  form .form-items .form-item .range input {
    border-radius: 0;
  }
  form .form-items .form-item .range input:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  form .form-items .form-item .range input:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }
  form input[type="submit"] {
    background-color: #0d65d9;
    padding: 0.75rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: #fafafa;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 75ms ease-out;
  }
  form input[type="submit"]:hover {
    background-color: #0b5eda;
  }

  #draw-location-button {
    background-color: hsl(214, 15%, 50%);
    padding: 0.75rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: #fafafa;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 75ms ease-out;
  }
  #draw-location-button:hover {
    background-color: hsl(214, 15%, 40%);
  }
  #draw-location-button.isDrawing {
    background-color: hsl(129, 75%, 35%);
  }
</style>
