<script lang="ts">
  import { onMount } from "svelte";
  import type { UserData } from "../../types";
  import BuyerInputDropdownOption from "./BuyerInputDropdownOption.svelte";
  import { emptyFiltersObject } from "../utils/filter";

  const label = "Korisnik";
  const id = "buyer";

  const users: UserData[] = [
    {
      name: "Marko Marković",
      contact: "marko@email.com",
      note: "Makro želi imati dvije nekretnine, ne želi kupaonu, i želi da može prošetati svog velikog psa odma pored kuće",
      filters: emptyFiltersObject(),
      favoriteProperties: [],
    },
    {
      name: "Pero Perić",
      contact: "pero@email.com",
      note: "Pero bi volio imati vrt, i želi da mu je kuća blizu škole",
      filters: emptyFiltersObject(),
      favoriteProperties: ["1"],
    },
    {
      name: "Ivana Ivić",
      contact: "098 123 4567",
      note: "Ivana želi imati bazen, i želi da joj je kuća blizu trgovine. Voli kuhati pa bi voljela veliku kuhinju",
      filters: emptyFiltersObject(),
      favoriteProperties: ["1", "3"],
    },
  ];

  let selectedUser: string = "";

  let isOpen: boolean = false;

  function handleOptionClick(value: string) {
    console.log("handleOptionClick", value);
    selectedUser === value;
  }

  function toggleDropdownOptionsVisibility() {
    isOpen = !isOpen;
  }

  onMount(() => {
    window.addEventListener("click", (e) => {
      if (isOpen) {
        const target = e.target as HTMLElement;
        const isCurrentButton = target.id === id;
        const isOptionButton = target.classList.contains("dropdown-input-option");
        const isOptionsButton2 = target.closest(".dropdown-input-options");

        if (!isCurrentButton && !isOptionButton && !isOptionsButton2) {
          isOpen = false;
        }
      }
    });
  });
</script>

<div class="dropdown-input">
  <label for={id}>{label}</label>

  <!-- Add html attributes so it acts like a <select> element (selectable, etc) -->
  <button
    type="button"
    class="dropdown-input-current"
    {id}
    on:click={toggleDropdownOptionsVisibility}
  >
    {selectedUser || "Odaberi korisnika"}
  </button>

  <div class="dropdown-input-options" style:display={isOpen ? "flex" : "none"}>
    {#each users as user}
      <BuyerInputDropdownOption userData={user} />
    {/each}
  </div>
</div>

<style>
  .dropdown-input {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /* width: fit-content; */
  }

  label {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
    padding-right: 0.5rem;
  }

  .dropdown-input-current {
    /* width: 100%; */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;

    height: 2.5rem;
    border-radius: 0.25rem;
    outline: 1px solid transparent;
    border: 1px solid #e6e6e6;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    font-size: 0.875rem;
    color: #1a1a1a;
    font-weight: 400;

    transition: outline 75ms ease-out;
  }
  .dropdown-input-current:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }

  .dropdown-input-options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 1001;
    width: max-content;
    /* right: 0; */
    /* display: none; */
    /* display: flex; */
    flex-direction: column;

    border-radius: 0.375rem;
    background-color: #ffffff;
    box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.4);
  }
</style>
