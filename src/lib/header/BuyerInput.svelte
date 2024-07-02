<script lang="ts">
  import { onMount } from "svelte";
  import type { UserData } from "../../types";

  const label = "Korisnik";
  const id = "buyer";
  const options = ["Pero", "Mato", "Štef"];

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

        if (!isCurrentButton && !isOptionButton) {
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
    {#each options as option}
      <button
        type="button"
        class="dropdown-input-option"
        class:selected={selectedUser === option}
        on:click={() => {
          handleOptionClick(option);
        }}
      >
        {option}
      </button>
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
    z-index: 2;
    width: max-content;
    /* right: 0; */
    /* display: none; */
    /* display: flex; */
    flex-direction: column;

    border-radius: 0.375rem;
    background-color: #ffffff;
    box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.4);
  }
  .dropdown-input-options .dropdown-input-option {
    border: none;
    outline: none;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;

    padding: 1rem;
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #1a1a1a;
    font-size: 1rem;
    font-weight: 500;

    transition: background-color 75ms ease-out;
    cursor: pointer;
  }

  .dropdown-input-options .dropdown-input-option:hover,
  .dropdown-input-options .dropdown-input-option:focus {
    background-color: hsl(0, 0%, 95%);
  }

  .dropdown-input-options .dropdown-input-option .checkbox-square {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    background-color: transparent;
    border: 2px solid #808080;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dropdown-input-options .dropdown-input-option.selected .checkbox-square {
    background-color: #0b5eda;
    border-color: #0b5eda;
  }

  /* Divideri između opcija */
  .dropdown-input-options .dropdown-input-option {
    border-bottom: 1px solid #e6e6e6;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .dropdown-input-options .dropdown-input-option:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }
</style>
