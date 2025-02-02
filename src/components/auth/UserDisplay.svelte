<script lang="ts">
  import { logOut } from "../../auth";
  import type { Agent } from "../../types";

  interface Props {
    user: Agent;
  }

  let { user }: Props = $props();

  let isDropdownOpen = $state(false);

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function handleLogOutClick() {
    logOut();
    window.location.reload();
  }

  const feedbackEmail = "lovretic2002@gmail.com";
  const docLink =
    "https://docs.google.com/document/d/1kUdQpw3vukVma3I58J0qT-dN85amSR8JU_UItpwqRDM/edit?usp=sharing";
</script>

<button id="user-display" onclick={toggleDropdown}>
  <img src={user.avatar} alt="pfp" />
  <span id="label">{user.username} ({user.role})</span>
</button>

<!-- Dropdown  -->
{#if isDropdownOpen}
  <div class="dropdown-container">
    <button class="dropdown-option" onclick={handleLogOutClick}> Log out </button>

    <div class="dropdown-container-footer">
      <p class="feedback-text">Feedback: {feedbackEmail}</p>
      <a class="feedback-text feedback-link" href={docLink} target="_blank">
        Upute.docx
      </a>
    </div>
  </div>
{/if}

<style>
  #user-display {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    background-color: transparent;
    padding: 0.5rem;
    border-radius: 0.75rem;

    transition: background-color 150ms ease-out;
  }
  #user-display:hover {
    background-color: hsl(0, 0%, 90%);
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125);
  }

  #label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  .dropdown-container {
    position: absolute;
    top: 100%;
    margin-top: 0.25rem;
    left: 0;
    right: 0;
    z-index: 1;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 1rem 0.5rem;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  .dropdown-container .dropdown-option {
    padding: 0.5rem 1rem;
    background-color: hsl(0, 0%, 95%);
    border: 1px solid hsl(0, 0%, 90%);
    border-radius: 0.5rem;

    font-size: 0.75rem;
    font-weight: 600;

    transition: background-color 150ms ease-out;
  }

  .dropdown-container .dropdown-option:hover {
    background-color: hsl(0, 0%, 90%);
  }

  .dropdown-container-footer {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    padding: 1rem 0.5rem 0 0.5rem;
    border-top: 1px solid hsl(0, 0%, 90%);
  }

  .feedback-text {
    display: block;
    font-size: 0.625rem;
    font-weight: 500;
    color: hsl(0, 0%, 50%);
  }

  .feedback-link {
    transition: color 150ms ease-out;
  }

  .feedback-link:hover {
    color: hsl(214, 89%, 50%);
  }
</style>
