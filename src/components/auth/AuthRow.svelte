<script lang="ts">
  import { getCurrentUser, logOut, userIsAuthenticated } from "../../auth";
  import LoginPopup from "./LoginPopup.svelte";
  import UserDisplay from "./UserDisplay.svelte";

  let isAuth = userIsAuthenticated();
  let user = getCurrentUser();
  let showLoginPopup: boolean = $state(false);

  function handleLogOutClick() {
    logOut();
    window.location.reload();
  }

  function toggleLoginPopupVisibility() {
    showLoginPopup = !showLoginPopup;
  }
</script>

<div id="auth-row">
  {#if isAuth && user}
    <UserDisplay {user} />

    <button onclick={handleLogOutClick}>Log out</button>
  {:else}
    {#if showLoginPopup}
      <LoginPopup />
    {/if}

    <button onclick={toggleLoginPopupVisibility}>Prijavi se</button>
  {/if}
</div>

<style>
  #auth-row {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
