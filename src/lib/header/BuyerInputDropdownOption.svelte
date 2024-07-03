<script lang="ts">
  import ChevronIcon from "../../assets/icons/ChevronIcon.svelte";
  import type { UserData } from "../../types";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let userData: UserData;

  function handleBuyerOptionClick() {
    dispatch("selectBuyer", userData);
  }
</script>

<button type="button" class="dropdown-input-option" on:click={handleBuyerOptionClick}>
  <div class="left">
    <div class="pfp-name-and-contact-container">
      <img src="/profile.png" alt="default profile icon" />
      <div class="name-and-contact">
        <p class="name">{userData.name}</p>
        <p class="contact">{userData.contact}</p>
      </div>
    </div>
    <p class="note">{userData.note}</p>
  </div>
  <div class="right"><ChevronIcon /></div>
</button>

<style>
  .dropdown-input-option {
    border: none;
    outline: none;
    text-align: left;

    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 1rem;
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #1a1a1a;
    font-size: 1rem;
    font-weight: 500;
    max-width: 25rem;

    transition: background-color 75ms ease-out;
    cursor: pointer;
  }

  .dropdown-input-option:hover,
  .dropdown-input-option:focus {
    background-color: hsl(0, 0%, 95%);
  }

  /* Divideri između opcija */
  .dropdown-input-option {
    border-bottom: 1px solid #e6e6e6;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .dropdown-input-option:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .left .pfp-name-and-contact-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .left img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
  }

  .left .name-and-contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .name {
    font-size: 1rem;
    color: #1a1a1a;
    font-weight: 500;
  }
  .contact {
    font-size: 0.875rem;
    color: #0b5eda;
    font-weight: 400;
  }

  .note {
    font-size: 0.75rem;
    color: #333333;
    font-weight: 400;
    line-height: 1.4;
  }
</style>
